import User from '../models/User.js';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // Don't allow password update here
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchAlumni = async (req, res) => {
  const { skill, company, location } = req.query;
  let query = { role: 'alumni' };
  if (skill) query.skills = skill;
  if (company) query.company = company;
  if (location) query.location = location;
  try {
    const alumni = await User.find(query).select('-password');
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchStudents = async (req, res) => {
  const { skill, company, location } = req.query;
  let query = { role: 'student' };
  if (skill) query.skills = skill;
  if (company) query.company = company;
  if (location) query.location = location;
  try {
    const students = await User.find(query).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 