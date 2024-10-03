import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Ward } from '../Models/Usermodel.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const secretKey = process.env.secretKey;

// Middleware to parse JSON requests
router.use(express.json());

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username }).populate('ward');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.json({
      token,
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        ward: user.ward,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, wardName } = req.body;

    if (!username || !password || !wardName) {
      return res.status(400).json({ message: 'Username, password, and ward name are required' });
    }

    if (password.length < 6 || password.length > 30) {
      return res.status(400).json({ message: 'Password should be between 6 and 30 characters' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    let ward = await Ward.findOne({ type: wardName });

    if (!ward) {
      ward = new Ward({ type: wardName });
      await ward.save();
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password,
      ward: ward._id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /wards
// router.get('/wards', async (req, res) => {
//   try {
//     const wards = await Ward.find();
//     res.json(wards);
//   } catch (error) {
//     console.error('Error fetching wards:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

export default router;