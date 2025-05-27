import express from 'express'
import RateLimiter from '../middleware/rateLimiter.js'
import {
    getOfferForWheel,
    getOffersFromWheel,
    addOffer,
    deleteOffer,
    updatedOffer,
} from '../controller/wheelController.js'
import {
    authenticate,
    authorization
} from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/', authenticate, authorization(["admin"]), RateLimiter, getOffersFromWheel);
router.get('/offerForWheel', getOfferForWheel);
router.post('/addOffer' , addOffer);
router.post('/addOffer' , addOffer);
router.post('/updatedOffer' , updatedOffer);
router.delete('/deleteOffer' ,authenticate , authorization(["admin"]) ,  deleteOffer);
export default router;
