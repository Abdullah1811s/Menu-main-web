import express from "express";
import { createPaymentPlan, updatePaymentPlan } from "../controller/paymentPlanController.js";
import { authenticate, authorization } from "../middleware/authMiddleware.js";
import RateLimiter from "../middleware/rateLimiter.js";
const router = express.Router();

router.post("/create", authenticate, authorization(["admin"]), RateLimiter, createPaymentPlan);
router.put("/update/:id", authenticate, authorization(["admin"]), RateLimiter, updatePaymentPlan);

export default router;
