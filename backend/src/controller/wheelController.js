import wheelModel from "../models/wheel.model.js";
import { sendEmail } from "../utils/sendEmail.js";

// Add offer to wheel
export const addOffer = async (req, res) => {
    try {
        const { term, quantity, label, endDate, extraInfo, id, role } = req.body;

        if (!quantity || !endDate || !id || !label)
            return res.status(400).json({ message: "Please provide all required details", success: false });

        // Check if the offer already exists for this vendor by label
        const isOfferExist = await wheelModel.findOne({
            "createdBy.userId": id,
            "offering.label": label,
        });

        if (isOfferExist) {
            return res.status(409).json({
                success: false,
                message: "The offer is already on the wheel",
            });
        }

        // Check if endDate is a valid future date
        const isEndDatePast = new Date(endDate).getTime() < Date.now();
        if (isEndDatePast) {
            return res.status(409).json({
                message: "The end date can't be in the past",
                success: false,
            });
        }

        const newOffer = {
            term,
            label,
            quantity,
            endDate,
            extraInfo,
        };

        // Check if the wheel already exists for the vendor/admin
        const existingWheel = await wheelModel.findOne({ "createdBy.userId": id });

        if (existingWheel) {
            existingWheel.offering.push(newOffer);
            await existingWheel.save();
        } else {
            const userType = role.includes("admin") ? "Admin" : "Vendor";

            const wheelObj = {
                createdBy: {
                    userId: id,
                    userType: userType,
                },
                offering: [newOffer],
            };

            await wheelModel.create(wheelObj);
        }

        return res.status(200).json({
            success: true,
            message: "The offer has been added to the wheel",
        });

    } catch (error) {
        console.error("[addOffer error]:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getOffersFromWheel = async (req, res) => {
    try {
        const allWheel = await wheelModel.find();
        res.status(200).json({ success: true, data: allWheel });
    } catch (error) {
        console.error("[getOfferForWheel error]:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getOfferForWheel = async (req, res) => {
    try {
        const allWheel = await wheelModel.aggregate([
            {
                $project: {
                   
                    offering: {
                        $filter: {
                            input: "$offering",
                            as: "offer",
                            cond: {
                                $and: [
                                    { $gt: ["$$offer.endDate", new Date()] },
                                    { $gt: ["$$offer.quantity", 0] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    "offering.0": { $exists: true }
                }
            }
        ]);

        res.status(200).json({ success: true, data: allWheel });
    } catch (error) {
        console.error("[getOfferOnWheel error]:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update offer (admin or vendor)
export const updatedOffer = async (req, res) => {
    try {
        const updatedData = { ...req.body };
        console.log(updatedData);
        if (!updatedData || !updatedData.userId || !updatedData.offerId) {
            return res.status(400).json({ success: false, message: "Missing required data" });
        }

        const updatedWheel = await wheelModel.findOneAndUpdate(
            {
                "createdBy.userId": updatedData.userId,
                "offering._id": updatedData.offerId
            },
            {
                $set: {
                    "offering.$.term": updatedData.term,
                    "offering.$.label": updatedData.label,
                    "offering.$.quantity": updatedData.quantity,
                    "offering.$.extraInfo": updatedData.extraInfo,
                    "offering.$.endDate": updatedData.endDate,
                }
            },
            { new: true }
        ).select("-createdBy");

        if (!updatedWheel) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        return res.status(200).json({ success: true, message: "Offer updated successfully", data: updatedWheel });
    } catch (error) {
        console.error("[updatedOffer error]:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete an offer from wheel
export const deleteOffer = async (req, res) => {
    try {
        const { label, vendorId } = req.body;

        if (!label || !vendorId) {
            return res.status(400).json({
                success: false,
                message: "Please provide both label and vendorId"
            });
        }

        const result = await wheelModel.findOneAndUpdate(
            { "createdBy.userId": vendorId },
            { $pull: { offering: { label } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Wheel not found or offer not present"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Offer deleted successfully",
            data: result
        });
    } catch (error) {
        console.error("[deleteOffer error]:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


