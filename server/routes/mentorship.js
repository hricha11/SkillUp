import express from 'express';
import { postMentorship } from '../controllers/mentorshipController.js';
import { protect, } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('student'), postMentorship);

export default router; 