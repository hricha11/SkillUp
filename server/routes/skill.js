import express from 'express';
import { compareSkills } from '../controllers/skillController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, compareSkills);

export default router; 