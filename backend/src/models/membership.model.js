/*
                            NOTE THIS SCHEMA ONLY STORE THE USER WHEN THEY HAVE PAYED
*/


import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"]
  },
  amountPaid: {
    type: Number,
    required: [true, "Paid amount is required"]
  },
  memberShipType: {
    type: String,
    enum: ["Monthly", "Once-off-Pass"],
    required: true
  },
  tier: {
    type: String,
    required:[true , "tier is required"]
  }
});


export default mongoose.model("Membership", memberShipSchema);
