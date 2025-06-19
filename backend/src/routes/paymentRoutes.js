import express from "express";
import { createHostedCheckout } from '../controller/paymentController.js';

const router = express.Router();

router.post("/checkout", createHostedCheckout);

export default router;
