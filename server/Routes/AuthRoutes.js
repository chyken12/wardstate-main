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

     // Include redirectUrl in the response based on user role
     const redirectUrl = user.role === 'Admin' ? '/admin-dashboard' : '/login';

    res.json({
      token,
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        ward: user.ward,
      },
      redirectUrl
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, wardName, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Username, password and role are required' });
    }

    // Convert role to lowercase for validation
    const normalizedRole = role.toLowerCase();

    if (!['user', 'admin'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (password.length < 6 || password.length > 30) {
      return res.status(400).json({ message: 'Password should be between 6 and 30 characters' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    let wardId;
    // Only process ward if role is user
    if (normalizedRole === 'user') {
      if (!wardName) {
        return res.status(400).json({ message: 'Ward selection is required for User role' });
      }

      let ward = await Ward.findOne({ type: wardName });
      if (!ward) {
        const allowedWards = [
          'Male Medical',
          'Female Medical',
          'Male Surgical',
          'Female Surgical',
          'Maternity',
          'NICU',
          'Kids Ward'
        ];

        if (!allowedWards.includes(wardName)) {
          return res.status(400).json({ message: 'Invalid ward selection' });
        }

        ward = new Ward({ type: wardName });
        await ward.save();
      }
      wardId = ward._id;
    }

    const newUser = new User({
      username,
      password,
      role: normalizedRole,
      ...(normalizedRole === 'user' ? { ward: wardId } : {})
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
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