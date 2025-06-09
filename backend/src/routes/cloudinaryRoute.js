import express from "express";
import generateSignature from '../controller/Cloudinary.js'
const router = express.Router();
router.post('/' , generateSignature);
export default router;