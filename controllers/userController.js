import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = "mera_super_secret_key_123";

// ==========================================
// 1. USER SIGNUP (REGISTER) CONTROLLER
// ==========================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists!" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Storing encrypted password
      role: role || 'user' // Default to 'user' if role is not provided
       });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    console.error("Signup me error:", error);
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

// ==========================================
// 2. USER LOGIN CONTROLLER
// ==========================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required!" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

   
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }

    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    res.status(200).json({
      message: "Login Successful!",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login me error:", error);
    res.status(500).json({ message: "Failed to log in", error: error.message });
  }
};
