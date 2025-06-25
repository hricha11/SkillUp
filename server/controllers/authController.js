import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async (req, res) => {
  const { name, email, password, role, gradYear, company, skills, certifications } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashed = await hashPassword(password);
    user = new User({
      name, email, password: hashed, role, gradYear, company, skills, certifications
    });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: 'Invalid credentials or role' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Here you would generate a reset token and send an email
    return res.json({ message: 'Password reset instructions sent to your email (not implemented yet).' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 