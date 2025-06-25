import express from 'express';
import { getUser, updateUser, searchAlumni, searchStudents } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', protect, searchAlumni);
router.get('/students/search', protect, searchStudents);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);

export default router; 