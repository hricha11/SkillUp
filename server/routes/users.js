import express from 'express';
import { getUser, updateUser, searchAlumni } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', protect, searchAlumni);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);

export default router; 