import express, { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';
import { UPLOAD_DIR } from '../constants/index.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/students', studentsRouter);
router.use('/uploads', express.static(UPLOAD_DIR));

export default router;
