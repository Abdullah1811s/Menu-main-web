import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import affiliateModel from '../models/affiliate.model.js';
import { sendEmail } from "../utils/sendEmail.js";
import { generateResetToken, generateToken } from "../utils/generateToken.js";
import { verifyCaptcha } from '../utils/verifyReCaptcha.js';



export const LoginAffiliate = async (req, res) => {
    try {
        const { email, password, reCaptcha } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter complete details" });
        // if (!reCaptcha)
        //     return res.status(400).json({ message: "Please complete the reCaptcha" });

        // const isReCaptchaValid = await verifyCaptcha(reCaptcha);
        // if (!isReCaptchaValid)
        //     return res.status(400).json({ message: "Invalid reCaptcha. Please reload and try again." });

        const checkUser = await affiliateModel.findOne({ email });
        if (!checkUser)
            return res.status(404).json({ message: "User not found. Please check details and try again." });

        if (checkUser.status === "pending")
            return res.status(403).json({
                message: "Your account is currently under review. Please wait for approval before accessing the system."
            });

        if (checkUser.status === "rejected") {
            return res.status(403).json({
                message: "Your application has been rejected by the admin. Please register again or contact support."
            });
        }
        const isPasswordCorrect = await checkUser.comparePassword(password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid email or password" });

        const payload = {
            id: checkUser._id,
            name:checkUser.name,
            email:checkUser.email,
            role: "affiliate"
        };

        const accessToken = generateToken(payload, "1h");
        const frontendToken = generateToken(payload, "7d");

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            frontendToken,
            user:{
                id:checkUser.id,
                name:checkUser.name,
                role:"affiliate"
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const signupAffiliate = async (req, res) => {
    try {
        const {
            name,
            surname,
            email,
            password,
            phone,
            affiliateType,
            bankName,
            accountHolder,
            accountNumber,
            branchCode,
            ...rest
        } = req.body;
        console.log("=================================================")
        console.log("The req is coming", req.body);
        console.log("=================================================")
        if (!name || !surname || !email || !password || !phone || !affiliateType || !bankName || !accountHolder || !accountNumber || !branchCode) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        const existingUser = await affiliateModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const newAffiliate = new affiliateModel({
            name,
            surname,
            email,
            password,
            phone,
            affiliateType,
            bankName,
            accountHolder,
            accountNumber,
            branchCode,
            ...rest
        });

        await newAffiliate.save();
        console.log("new : ", newAffiliate)
        return res.status(200).json({ message: "Affiliate registered successfully. Please wait for the approval" });

    } catch (error) {
        console.log("Signup error:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};


export const forgetPass = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Please provide the email" });
        const checkUser = await affiliateModel.findOne({ email });
        if (!checkUser)
            return res.status(200).json({ message: "If the account exist we will send email" });
        const resetToken = generateResetToken(checkUser._id);

        checkUser.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        checkUser.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await checkUser.save();


        const resetUrl = `${process.env.FRONTEND_URL}/affiliate/reset-password/${resetToken}`;
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
            checkUser.email,
            "Affiliate Password Reset Request",
            "Reset your password",
            message
        );

        return res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            message: "Server error while processing forgot password request",
            error: error.message
        });
    }
}


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

        const affiliate = await affiliateModel.findOne({
            _id: checkToken.id,
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!affiliate) {
            return res.status(400).json({
                message: "Password reset token is invalid or has expired"
            });
        }


        affiliate.password = password;
        affiliate.resetPasswordToken = undefined;
        affiliate.resetPasswordExpire = undefined;
        await affiliate.save();

        const smtpConfig = {
            host: "mail.themenuportal.co.za",
            port: 465,
            user: "affiliates@themenuportal.co.za",
        };

        await sendEmail(
            smtpConfig,
            affiliate.email,
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


export const getAllAffiliate = async (req, res) => {
    try {
        const affiliates = await affiliateModel.find({}, {
            password: 0,
            resetPasswordToken: 0,
            resetPasswordExpire: 0,
            __v: 0
        });

        return res.status(200).json({ success: true, data: affiliates });
    } catch (error) {
        console.error("Error fetching affiliates:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAffiliateById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Affiliate ID is required" });
        }

        const affiliate = await affiliateModel.findById(id, {
            password: 0,
            resetPasswordToken: 0,
            resetPasswordExpire: 0,
            __v: 0
        });

        if (!affiliate) {
            return res.status(404).json({ success: false, message: "Affiliate not found" });
        }

        return res.status(200).json({ success: true, data: affiliate });
    } catch (error) {
        console.error("Error fetching affiliate:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const delAffiliate = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Affiliate ID is required" });
        }

        const deletedAffiliate = await affiliateModel.findByIdAndDelete(id);

        if (!deletedAffiliate) {
            return res.status(404).json({ success: false, message: "Affiliate not found" });
        }

        return res.status(200).json({ success: true, message: "Affiliate deleted successfully" });
    } catch (error) {
        console.error("Error deleting affiliate:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Affiliate ID and status are required" });
        }


        const validStatuses = ["pending", "approved", "rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updatedAffiliate = await affiliateModel.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).select('-password -resetPasswordToken -resetPasswordExpire -__v');

        if (!updatedAffiliate) {
            return res.status(404).json({ success: false, message: "Affiliate not found" });
        }

        return res.status(200).json({ success: true, data: updatedAffiliate });
    } catch (error) {
        console.error("Error updating affiliate status:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



export const updateAffiliate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Affiliate ID is required" });
        }
        const updateData = { ...req.body };

        const checkAffiliate = await affiliateModel.findById(id);
        if (!checkAffiliate)
            return res.status(404).json({ message: "Affiliate not found" });
        const updated = await affiliateModel.findByIdAndUpdate(id, { ...updateData }, { new: true, runValidators: true })
            .select('-password -resetPasswordToken -resetPasswordExpire -__v');
        if (updated)
            return res.status(200).json({ message: "Affiliate details updated", updatedData: updated, success: true })
    }
    catch (error) {
        console.error("Error updating affiliate:", error);
        return res.status(500).json({ success: false, message: "unable to update affiliate data server error" });
    }
}



