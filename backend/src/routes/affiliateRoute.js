import express from 'express'
import RateLimiter from '../middleware/rateLimiter.js'
import {
    LoginAffiliate,
    signupAffiliate,
    resetPass,
    forgetPass,
    getAllAffiliate,
    getAffiliateById,
    delAffiliate,
    updateStatus,
    updateAffiliate,
} from '../controller/affiliateController.js'
import { authorization, authenticate } from '../middleware/authMiddleware.js'
const router = express.Router();
router.get('/', RateLimiter,  getAllAffiliate);
router.post('/login' , RateLimiter , LoginAffiliate);
router.post('/sign-up' , RateLimiter , signupAffiliate);
router.post("/forgot-password", forgetPass);
router.put("/reset-password/:token", resetPass);
router.put("/updateStatus", authenticate, authorization(["admin" , "superadmin"]), updateStatus);
router.get('/:id', RateLimiter, getAffiliateById);
router.put('/update/:id' , RateLimiter , authenticate , authorization(["affiliate"]) , updateAffiliate)
router.delete('delete/:id' , authenticate , authorization(["admin" , "superAdmin"]) , delAffiliate);


export default router;