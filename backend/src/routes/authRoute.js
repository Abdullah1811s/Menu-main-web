import express from 'express';
import { signup, login, resetPass, forgetPass } from '../controller/authcontroller.js';
import RateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', RateLimiter, login);
router.post('/signup', RateLimiter, signup);
router.post('/forget-pass', RateLimiter, forgetPass);
router.post('/reset-pass/:resetToken', RateLimiter, resetPass);

export default router;
