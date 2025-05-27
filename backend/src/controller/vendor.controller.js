import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";
import { generateResetToken, generateToken } from "../utils/generateToken.js";
import { verifyCaptcha } from '../utils/verifyReCaptcha.js';
import vendorModel from '../models/vendor.model.js';



export const checkVendorEmailExists = async (req, res) => {
    try {
        const { businessEmail } = req.query;

        if (!businessEmail) {
            return res.status(400).json({
                success: false,
                message: "Business email is required as a query parameter"
            });
        }

        const vendor = await vendorModel.findOne({ businessEmail }).lean();

        return res.status(200).json({
            success: true,
            exists: !!vendor,
            message: vendor
                ? "Vendor with this email already exists"
                : "Email is available"
        });

    } catch (error) {
        console.error("Error checking vendor email:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const registerVendor = async (req, res) => {
    try {
        const {
            businessEmail,
            password,
            businessName,
            businessType,
            companyRegNumber,
            tradingAddress,
            province,
            city,
            businessContactNumber,
            representativeName,
            representativePosition,
            representativeEmail,
            representativePhone,
            agreedToTerms,
            ...rest
        } = req.body;
        if (
            !businessEmail ||
            !password ||
            !businessName ||
            !businessType ||
            !companyRegNumber ||
            !tradingAddress ||
            !province ||
            !city ||
            !businessContactNumber ||
            !representativeName ||
            !representativePosition ||
            !representativeEmail ||
            !representativePhone ||
            agreedToTerms !== true
        ) {
            return res.status(400).json({ success: false, message: "Please provide all required fields." });
        }
        const newVendor = await vendorModel.create({
            businessEmail,
            password,
            businessName,
            businessType,
            companyRegNumber,
            tradingAddress,
            province,
            city,
            businessContactNumber,
            representativeName,
            representativePosition,
            representativeEmail,
            representativePhone,
            agreedToTerms,
            ...rest
        })
        if (newVendor)
            return res.status(201).json({ message: "The Partner has been created" });
    } catch (error) {
        console.error("[vendor register] ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const loginVendor = async (req, res) => {
    try {
        const { businessEmail, password, reCaptcha } = req.body;

        if (!businessEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter complete details"
            });
        }

        // if (!reCaptcha) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please complete the reCaptcha"
        //     });
        // }

        // const isReCaptchaValid = await verifyCaptcha(reCaptcha);
        // if (!isReCaptchaValid) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid reCaptcha. Please reload and try again."
        //     });
        // }

        const checkUser = await vendorModel.findOne({ businessEmail });
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please check details and try again."
            });
        }

        const isPasswordCorrect = await checkUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const payload = {
            id: checkUser._id,
            role: "vendor"
        };
        const token = generateToken(payload, "1h");

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // secure only in production
            sameSite: 'strict',
            maxAge: 7 * 60 * 60 * 1000, // 7 hours
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const forgetPass = async (req, res) => {
    try {
        const { businessEmail } = req.body;
        if (!businessEmail)
            return res.status(400).json({ success: false, message: "Please provide the email" });
        const vendor = await vendorModel.findOne({ businessEmail });
        if (!vendor)
            return res.status(200).json({ success: true, message: "Wel will send the reset link if the account exist" });
        const resetToken = generateResetToken(vendor._id);
        vendor.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        vendor.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        await vendor.save();


        const resetUrl = `${process.env.FRONTEND_URL}/partner/reset-password/${resetToken}`;
        const message = `
            <p>You requested a password reset for your affiliate account.</p>
            <p>Please click the link below to reset your password:</p>
            <a href="${resetUrl}">Reset Password</a>
            <p>This link will expire in 10 min.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;


        const smtpConfig = {
            host: "mail.themenuportal.co.za",
            port: 465,
            user: "affiliates@themenuportal.co.za",
        };

        await sendEmail(
            smtpConfig,
            vendor.businessEmail,
            "Partner Password Reset Request",
            "Reset your password",
            message
        );

        return res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const resetPass = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (!password)
            return res.status(400).json({ message: "Please provide all detail" });

        const checkToken = jwt.verify(token, process.env.JWT_SECRET, + '-reset');
        if (!checkToken)
            return res.status(401).json({ message: "Unauthorized request" });


        const hashedToken = crypto
            .createHash('sha256')
            .update(checkToken)
            .digest('hex');

        const vendor = await vendorModel.findOne({
            _id: checkToken.id,
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!vendor) {
            return res.status(400).json({
                message: "Password reset token is invalid or has expired"
            });
        }


        vendor.password = password;
        vendor.resetPasswordToken = undefined;
        vendor.resetPasswordExpire = undefined;
        await vendor.save();

        const smtpConfig = {
            host: "mail.themenuportal.co.za",
            port: 465,
            user: "affiliates@themenuportal.co.za",
        };

        await sendEmail(
            smtpConfig,
            vendor.businessEmail,
            "Affiliate Password Changed Successfully",
            "Password Update Confirmation",
            `<p>Your affiliate account password has been successfully updated.</p>
         <p>If you did not make this change, please contact support immediately.</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Server error while resetting password" });
    }
}


export const updatedVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body };
        if (!id)
            return res.status(400).json({ success: false, message: "please provide the id" });
        const updatedVendor = await vendorModel.findByIdAndUpdate(id, { ...updatedData }, { new: true, runValidators: true }).select('-password -resetPasswordToken -resetPasswordExpire -__v');
        if (!updatedVendor) {
            return res.status(404).json({ success: false, message: "Vendor not found." });
        }
        if (updatedVendor)
            return res.status(200).json({ success: true, message: "The partner details has been updated", updatedDetails: updatedVendor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



//==================================================================================================

export const getAllVendor = async (req, res) => {
    try {
        const partners = await vendorModel.find().select('-password -resetPasswordToken -resetPasswordExpire -__v');
        return res.status(200).json({
            success: true,
            message: "All partners have been fetched",
            partners,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ success: false, message: "Please provide the partner id" });
        const vendor = await vendorModel.findById(id).populate("wheelOffers")
            .select('-password -resetPasswordToken -resetPasswordExpire -__v');
        return vendor ? res.status(200).json({ success: true, message: "partner found", partner: vendor })
            : res.status(404).json({ success: false, message: "Vendor not found" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const updateStatus = async (req, res) => {
    try {
        const { id, updatedStatus } = req.body;

        if (!id || !updatedStatus) {
            return res.status(400).json({ success: false, message: "Please provide both id and new status." });
        }
        const updatedVendor = await vendorModel.findByIdAndUpdate(
            id,
            { status: updatedStatus },
            { new: true, runValidators: true }
        ).select('-password -resetPasswordToken -resetPasswordExpire -__v');

        return updatedVendor
            ? res.status(200).json({ success: true, message: "Status updated successfully", updatedVendor })
            : res.status(404).json({ success: false, message: "Partner not found" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateTier = async (req, res) => {
    try {
        const { id, newTier } = req.body;

        if (!id || !newTier) {
            return res.status(400).json({ success: false, message: "Please provide both id and newTier." });
        }

        const allowedTiers = ["bronze", "silver", "gold"];
        if (!allowedTiers.includes(newTier)) {
            return res.status(400).json({ success: false, message: "Invalid tier value." });
        }

        const updatedVendor = await vendorModel.findByIdAndUpdate(
            id,
            { vendorTier: newTier },
            { new: true, runValidators: true }
        ).select('-password -resetPasswordToken -resetPasswordExpire -__v');

        return updatedVendor
            ? res.status(200).json({ success: true, message: "Vendor tier updated successfully", updatedVendor })
            : res.status(404).json({ success: false, message: "Vendor not found" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide the vendor ID" });
        }

        const deletedVendor = await vendorModel.findByIdAndDelete(id);

        return deletedVendor
            ? res.status(200).json({ success: true, message: "Vendor deleted successfully" })
            : res.status(404).json({ success: false, message: "Vendor not found" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
