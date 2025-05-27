


import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true, 
    trim: true
  },
  cost: {
    type: Number,
    required: true
  },
  vendorAccess: {
    type: Boolean,
    default: true 
  },
  entries: {
    type: Number,
    required: true
  },
  entryBanking: {
    type: Boolean,
    default: false
  },
  durationInDays: {
    type: Number, 
    required: true
  },
  durationType: {
    type: String,
    enum: ["hours", "days" , "annual"],
    default: "days"
  },
  leaderboardEligible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("PaymentPlan", paymentSchema);
