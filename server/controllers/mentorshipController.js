import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';

export const postMentorship = async (req, res) => {
  const { alumniId, message } = req.body;
  try {
    const alumni = await User.findById(alumniId);
    if (!alumni || alumni.role !== 'alumni' || !alumni.mentorshipAvailable) {
      return res.status(400).json({ message: 'Alumni not available for mentorship' });
    }
    const mentorship = new Mentorship({
      student: req.user.id,
      alumni: alumniId,
      message
    });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 