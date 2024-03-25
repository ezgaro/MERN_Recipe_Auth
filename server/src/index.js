import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { usersRouter } from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);

mongoose.connect(process.env.BASE_URL);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});