import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Models/Usermodel.js"

const router = express.Router();
const secretKey = 'process.env.secretKey'; 

// Middleware to parse JSON requests
router.use(express.json());




// POST /login
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    

    const user = await User.findOne({ userName });

    
    const isValidPassword = bcrypt.compare(password, user.password);

   

    const token = jwt.sign({userId: user._id }, secretKey, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  }  catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const {userName, password } = req.body;

   

    const existingUser= await User.findOne({userName });

  

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({userName, password: hashedPassword });

    await newUser.save();

    res.json({ message: 'Signup successful' });
  }  catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
