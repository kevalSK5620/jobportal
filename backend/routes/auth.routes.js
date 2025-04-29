import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

// Password reset routes
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router; 