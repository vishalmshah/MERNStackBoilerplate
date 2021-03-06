import express from 'express';
import jwt from 'jsonwebtoken';
// import authenticate from '../middlewares/authenticate';

import User from '../models/User';
import { sendResetPasswordEmail, sendResetPasswordConfirmationEmail } from '../mailer';

const router = express.Router();
// router.use(authenticate);

router.post('/', (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: 'Invalid credentials' } });
    }
  });

});

router.post('/confirmation', (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate(
    { confirmationToken: token }, 
    { confirmationToken: '', confirmed: true }, 
    { new: true }
  ).then(user => 
    user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

router.post('/reset_password_request', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      user.setResetPasswordToken();
      sendResetPasswordEmail(user);
      user.save();
      res.status(201).json({});
    } else {
      res.status(400).json({ errors: { global: 'There is no user with this email' } });
    }
  })
});

router.post('/validate_token', (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({});
    } else {
      // console.log(req.body.token);
      User.findOne({ _id: decoded._id }).then((user, err) => {
        // console.log(JSON.stringify(user.resetPasswordToken));
        if (user) {
          res.status(201).json({});
        } else {
          res.status(401).json({});
        }
      })
    }
  });
});

router.post('/reset_password', (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: 'Invalid token'} })
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.deleteResetPasswordToken();
          sendResetPasswordConfirmationEmail(user);
          user.save().then(() => res.status(201).json({}));
        } else {
          res.status(404).json({ errors: { global: 'Invalid Token' } });
        }
      })
    }
  })
});

export default router;
