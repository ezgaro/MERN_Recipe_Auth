import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if(user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({username, password: hashedPassword});
  await newUser.save();
  res.json({message: 'User created successfully'});
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  // Check if the user exists, returns a boolean
  if(!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check if the password is the same as the one in the database, returns a boolean
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Create a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, userID: user._id});
});

export {router as usersRouter}