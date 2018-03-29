import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const salt = 10;

// TODO: Add uniqueness and email validation to email field
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true
  },
  passwordHash: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: String, default: '' },
  resetPasswordToken: { type: String, default: '' }
}, { timestamp: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, salt);
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
}

schema.methods.setResetPasswordToken = function setResetPasswordToken() {
  this.resetPasswordToken = this.generateResetPasswordToken();
}

schema.methods.deleteResetPasswordToken = function setResetPasswordToken() {
  this.resetPasswordToken = '';
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${process.env.HOST}/reset_password/${this.resetPasswordToken}`;
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
    confirmed: this.confirmed
  }, process.env.JWT_SECRET)
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign({
    _id: this._id
  }, process.env.JWT_SECRET,
  { expiresIn: '1h' })
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
}

schema.plugin(uniqueValidator, { message: 'This email is already taken'});

export default mongoose.model('User', schema);
