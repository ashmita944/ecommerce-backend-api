import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Secret key token generate karne ke liye (Real app me ise .env file me rakhte hain)
const JWT_SECRET = "mera_super_secret_key_123";

// ==========================================
// 1. USER SIGNUP (REGISTER) CONTROLLER
// ==========================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // A. Check karo ki saari fields mili hain ya nahi
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Saari fields bharna zaroori hai!" });
    }

    // B. Check karo ki email pehle se registered toh nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Is email se account pehle se bana hua hai!" });
    }

    // C. Password ko Encrypt (Hash) karo
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // D. Naya User Database me Save karo
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Encrypted password save ho raha hai
      role: role || 'user' // Agar role nahi diya toh default 'user' hoga
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User successfully register ho gaya! 🎉",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    console.error("Signup me error:", error);
    res.status(500).json({ message: "Signup karne me dikkat aayi", error: error.message });
  }
};

// ==========================================
// 2. USER LOGIN CONTROLLER
// ==========================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // A. Check karo input diya hai ya nahi
    if (!email || !password) {
      return res.status(400).json({ message: "Email aur Password dono likho!" });
    }

    // B. Check karo email database me hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User nahi mila! Pehle Signup karo." });
    }

    // C. Password Match karo (Plain password vs Encrypted password)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Galat Password! Dubara try karo." });
    }

    // D. JWT Token (Digital Pass) Generate Karo
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' } // Token 7 din tak valid rahega
    );

    res.status(200).json({
      message: "Login Successful! 🔓",
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
    res.status(500).json({ message: "Login karne me dikkat aayi", error: error.message });
  }
};