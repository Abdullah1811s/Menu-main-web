import express from 'express'
import RateLimiter from '../middleware/rateLimiter.js'
import {
    checkVendorEmailExists,
    registerVendor,
    loginVendor,
    updatedVendor,
    resetPass,
    forgetPass,
    getAllVendor,
    getVendorById,
    deleteVendor,
    updateStatus,
    updateTier
} from '../controller/vendor.controller.js'
import {
    authenticate,
    authorization
} from '../middleware/authMiddleware.js'

const router = express.Router();
router.get('/', getAllVendor);
router.get('/getBusiness', checkVendorEmailExists );
router.post('/loginVendor', RateLimiter, loginVendor)
router.post('/sign-up', RateLimiter, registerVendor);
router.post('/updateVendor/:id', authenticate ,updatedVendor);
router.post('/updateStatus', authenticate, authorization(['admin']) , updateStatus);
router.post('/delVendor', authenticate, authorization(['admin']) , deleteVendor);
router.post('/updateTier', authenticate, authorization(['admin']) , updateTier);
router.get('/:id', getVendorById);
router.post('/forgetPass', RateLimiter, forgetPass);         
router.post('/resetPass', RateLimiter, resetPass);


export default router;