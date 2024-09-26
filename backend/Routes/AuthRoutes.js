import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Ward } from "../Models/Usermodel.js"

const router = express.Router();
const secretKey = 'process.env.secretKey'; 

// Middleware to parse JSON requests
router.use(express.json());




// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    

    const user = await User.findOne({ username });

    
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

router.get('/wards', async (req, res) => {
  try {
    const wards = await Ward.find(); // Fetch all wards from the database
    res.json(wards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching wards' });
  }
});



// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, wardName } = req.body;

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ errors: { password: 'Password should be at least 6 characters' } });
    }
    if (password.length > 30) {
      return res.status(400).json({ errors: { password: 'Password cannot exceed 30 characters' } });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ errors: { username: 'Username already exists' } });
    }

     // Find the ward by name
    let ward = await Ward.findOne({ name: wardName });
     if (!ward) {
      ward = new Ward({ name: wardName });
      await ward.save();
     }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


const newUser = new User({
  username,
  password: hashedPassword,
  ward: ward._id // Pass the ward ID to the new User
});

await newUser.save();

return res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
console.error('signup error:', error);
return res.status(500).json({ message: 'Server error', error: error.message  });
}
});
export default router;





