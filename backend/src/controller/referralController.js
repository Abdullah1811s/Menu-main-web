import ReferralModel from "../models/referral.model"
import affiliateModel from "../models/affiliate.model";
import userModel from "../models/user.model";
import referralModel from "../models/referral.model";


export const getAllReferralDetails = async (req, res) => {
    try {
        const referralDetails = await ReferralModel.find()
            .populate({
                path: "referrer",
                refPath: "referrerModel",
                select: "name email referralCode"
            })
            .populate({
                path: "referred",
                refPath: "referredModel",
                select: "name email referralCode"
            });
        return res.status(200).json({ referralDetails });
    } catch (error) {
        console.log("Error fetching referral details:", error);
        return res.status(500).json({ message: "Failed to fetch referral details" });
    }
}

export const getAllAffiliateReferralDetails = async (req, res) => {
    try {
        const details = await ReferralModel.find({
            $or: [
                { referrerModel: "Affiliate" },
                { referredModel: "Affiliate" }
            ]
        })
            .populate({
                path: "referrer",
                refPath: "referrerModel",
                select: "name email referralCode"
            })
            .populate({
                path: "referred",
                refPath: "referredModel",
                select: "name email referralCode"
            });

        return res.status(200).json({ referralDetails: details });
    } catch (error) {
        console.error("Error fetching affiliate-related referrals:", error);
        return res.status(500).json({ message: "Failed to fetch affiliate referral details" });
    }
};

export const getReferredDetailsBySingleAffiliate = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Please provide the affiliate ID", success: false });
        }

        const affiliateDetail = await affiliateModel.findById(id).select("name email")
            .populate({
                path: "referralsGiven", //this is saying  "i want model where this affiliate is the one who referred"
                populate: {
                    path: "referred",
                    refPath: "referredModel",
                }
            })
            .populate({
                path: "referralsReceived", //this is saying  "i want model where this affiliate is the one who used someone else code to get referred"
                populate: {
                    path: "referrer",
                    refPath: "referrerModel",

                }
            });

        if (!affiliateDetail) {
            return res.status(404).json({ message: "Affiliate not found", success: false });
        }
        const allReferrals = [
            ...(affiliateDetail.referralsGiven || [])
        ];

        const recentActivity = allReferrals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        const referredCount = affiliateDetail.referralsGiven?.length || 0;

        return res.status(200).json({
            success: true,
            affiliateDetail,
            referredCount,
            recentActivity
        });
    } catch (error) {
        console.error("Error fetching affiliate referral details:", error);
        return res.status(500).json({
            message: "Failed to fetch affiliate referral details",
            success: false
        });
    }
};

export const getLatestNReferralsForAffiliate = async (req, res) => {
    try {
        const { id, number } = req.body;

        if (!id || !number) {
            return res.status(400).json({
                message: "Please provide both 'id' and 'number'",
                success: false
            });
        }

        const referralDetails = await referralModel.find({
            referrer: id,
            referrerModel: "Affiliate"
        })
            .populate({
                path: "referred",
                refPath: "referredModel",
                select: "name email"
            })
            .sort({ createdAt: -1 })
            .limit(Number(number));  

        return res.status(200).json({
            success: true,
            count: referralDetails.length,
            referrals: referralDetails
        });
    } catch (error) {
        console.error("Error fetching latest referrals:", error);
        return res.status(500).json({
            message: "Failed to fetch latest referrals",
            success: false
        });
    }
};

export const getLatestNReferralsForUser = async (req, res) => {
    try {
        const { id, number } = req.body;

        if (!id || !number) {
            return res.status(400).json({
                message: "Please provide both 'id' and 'number'",
                success: false
            });
        }

        const referralDetails = await referralModel.find({
            referrer: id,
            referrerModel: "User"
        })
            .populate({
                path: "referred",
                refPath: "referredModel",
                select: "name email"
            })
            .sort({ createdAt: -1 })
            .limit(Number(number));  

        return res.status(200).json({
            success: true,
            count: referralDetails.length,
            referrals: referralDetails
        });
    } catch (error) {
        console.error("Error fetching latest referrals:", error);
        return res.status(500).json({
            message: "Failed to fetch latest referrals",
            success: false
        });
    }
};

export const getAllUserReferralDetails = async (req, res) => {
    try {
        const details = await ReferralModel.find({
            $or: [
                { referrerModel: "User" },
                { referredModel: "User" }
            ]
        })
            .populate({
                path: "referrer",
                refPath: "referrerModel",
                select: "name email referralCode"
            })
            .populate({
                path: "referred",
                refPath: "referredModel",
                select: "name email referralCode"
            });

        return res.status(200).json({ referralDetails: details });
    } catch (error) {
        console.error("Error fetching affiliate-related referrals:", error);
        return res.status(500).json({ message: "Failed to fetch affiliate referral details" });
    }
};

export const getReferredDetailsBySingleUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Please provide the affiliate ID", success: false });
        }

        const userDetail = await userModel.findById(id).select("name email")
            .populate({
                path: "referralsGiven", //this is saying  "i want model where this affiliate is the one who referred"
                populate: {
                    path: "referred",
                    refPath: "referredModel",
                }
            })
            .populate({
                path: "referralsReceived", //this is saying  "i want model where this affiliate is the one who used someone else code to get referred"
                populate: {
                    path: "referrer",
                    refPath: "referrerModel",

                }
            });

        if (!userDetail) {
            return res.status(404).json({ message: "Affiliate not found", success: false });
        }
        const allReferrals = [
            ...(userDetail.referralsGiven || [])
        ];

        const recentActivity = allReferrals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        const referredCount = userDetail.referralsGiven?.length || 0;

        return res.status(200).json({
            success: true,
            userDetail,
            referredCount,
            recentActivity
        });
    } catch (error) {
        console.error("Error fetching affiliate referral details:", error);
        return res.status(500).json({
            message: "Failed to fetch affiliate referral details",
            success: false
        });
    }
};