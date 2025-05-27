import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateResetToken, generateToken } from "../utils/generateToken.js";
import { verifyCaptcha } from '../utils/verifyReCaptcha.js';

//TODO:Referral link 


export const login = async (req, res) => {
    try {
        const { email, password, reCaptcha } = req.body;
        const isCaptchaValid = await verifyCaptcha(reCaptcha);
        if (!isCaptchaValid) {
            return res.status(400).json({ message: "Captcha verification failed please reload and try again" });
        }
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password!" });
        }


        const verifyUser = await userModel.findOne({ email: email });

        if (!verifyUser) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await verifyUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const payload = {
            id: verifyUser._id,
            name: verifyUser.name,
            email: verifyUser.email,
            role: verifyUser.role
        };

        const token = generateToken(payload, '7h');

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: verifyUser._id,
                role: verifyUser.role
            }
        });

    } catch (error) {
        console.error("❌ Login error:", {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });

        res.status(500).json({
            message: "Something went wrong. Please try again later.",
        });
    }
};


export const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            referralCode,
            city,
            province,
            street,
            town,
            postalCode,
            captchaToken,
            incomeRange,
            shoppingPreference,
            interestCategories,
            preferredDeals,
            giveawayPreferences,
            rewardEngagementFrequency,
            preferredNotificationMethod
        } = req.body;
        const isCaptchaValid = await verifyCaptcha(captchaToken);
        if (!isCaptchaValid) {
            return res.status(400).json({ message: "Captcha verification failed please reload and try again" });
        }

        if (!name || !email || !password || !phone || !town || !city || !province || !street || !postalCode) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return res.status(409).json({ message: "Email already registered, please log in" });
        }


        const newUser = await userModel.create({
            name,
            email,
            password,
            phone,
            role: "user",
            referralCode,
            city,
            province,
            street,
            town,
            postalCode,
            referralCode,
            incomeRange,
            shoppingPreference,
            interestCategories,
            preferredDeals,
            giveawayPreferences,
            rewardEngagementFrequency,
            preferredNotificationMethod
        });


        const payload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };


        const token = generateToken(payload, '7h');


        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 60 * 60 * 1000,
        });


        res.status(200).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const forgetPass = async (req, res) => {
    try {
        const { email, captchaToken } = req.body;
        const isCaptchaValid = await verifyCaptcha(captchaToken);
        if (!isCaptchaValid) {
            return res.status(400).json({ message: "Captcha verification failed please reload and try again" });
        }
        if (!email)
            return res.status(401).json({ message: "Please enter your email!" });
        const checkUser = await userModel.findOne({ email });
        if (!checkUser)
            return res.status(200).json({
                message: "If an account exists with this email, a reset link has been sent"
            });
        const resetToken = generateResetToken(checkUser._id);
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        checkUser.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        checkUser.resetPasswordExpire = Date.now() + 600000;


        await checkUser.save();
        const message = `
        <p>You requested a password reset for your account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 10 min.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `;

        const smtpConfig = {
            host: "mail.themenuportal.co.za",
            port: 465,
            user: "support@themenuportal.co.za",
        };

        await sendEmail(
            smtpConfig,
            checkUser.email,
            "Password Reset Request",
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
        const { resetToken } = req.params;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }


        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET + '-reset');


        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await userModel.findOne({
            _id: decoded.id,
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Password reset token is invalid or has expired"
            });
        }


        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();


        const smtpConfig = {
            host: "mail.themenuportal.co.za",
            port: 465,
            user: "support@themenuportal.co.za",
        };

        await sendEmail(
            smtpConfig,
            user.email,
            "Password Changed Successfully",
            "Password Update Confirmation",
            `<p>Your password has been successfully updated.</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error("Reset password error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Reset token has expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid reset token" });
        }
        return res.status(500).json({
            message: "Server error while resetting password",
            error: error.message
        });
    }
};