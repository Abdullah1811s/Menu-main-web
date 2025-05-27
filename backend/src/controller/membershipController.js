import membershipModel from "../models/membership.model.js";



export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await membershipModel.find().populate("userId", "name email"); 
    res.status(200).json({ success: true, memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching memberships", error });
  }
};



export const getMembershipsByTier = async (req, res) => {
  const { tier } = req.params;

  try {
    const memberships = await membershipModel.find({ tier }).populate("userId", "name email");
    
    if (memberships.length === 0) {
      return res.status(404).json({ success: false, message: `No memberships found for tier '${tier}'` });
    }

    res.status(200).json({ success: true, memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching memberships by tier", error });
  }
};
