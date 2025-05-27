import express from "express";
import {
  getAllMemberships,
  getMembershipsByTier
} from "../controller/membershipController.js";

const router = express.Router();

router.get("/", getAllMemberships);
router.get("/tier/:tier", getMembershipsByTier);

export default router;
