import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bluebird from 'bluebird';

import auth from './routes/auth';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URL, (err, db) => {
  if (err) console.log('Unable to connect to server. Err: ' + err)
  else console.log('Connected to server successfully. URL: ' + 'mongodb://localhost/boilerplate')
});

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));
