import express from 'express';
import { signup, login, switchRole, resetPass, forgetPass, logout } from '../controller/authcontroller.js';
import {
    authenticate
} from '../middleware/authMiddleware.js'
import RateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', RateLimiter, login);
router.post('/signup', RateLimiter, signup);
router.post('/switch-roles', RateLimiter, authenticate, switchRole)
router.post('/forget-pass', RateLimiter, forgetPass);
router.post('/reset-pass/:resetToken', RateLimiter, resetPass);
router.post('/logout', logout);

export default router;
