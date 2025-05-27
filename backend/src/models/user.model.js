import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"], trim: true },
        email: {
            type: String, required: [true, "Email is required"],
            unique: true, lowercase: true, trim: true,
            match: [/.+@.+\..+/, "Please enter a valid email"]
        },
        phone: { type: String },
        password: {
            type: String, required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            validate: {
                validator: function (value) {
                    return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
                },
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            },
        },
        city: { type: String, required: true, trim: true },
        province: { type: String, required: true, trim: true },
        street: { type: String, required: true, trim: true },
        town: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true, match: [/^\d+$/, "Postal code must contain only digits"] },
        role: { type: String, default: "user" },


        totalPoints: { type: Number, default: 0 },
        dailyLoginPoint: { type: Number, default: 0 },
        wheelRotatePoint: { type: Number, default: 0 },
        signupPoint: { type: Number, default: 0 },
        referralPoint: { type: Number, default: 0 },
        dailyLoginDate: { type: Date },
        numberOfTimesWheelRotate: { type: Number, default: 0 },
        firstSpinTime: { type: Date },
        prizeWon: [{ type: String }],
        isPaid: { type: Boolean, default: false },

        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date },
        referralCodeShare: { type: String },


        incomeRange: {
            type: String,
            enum: [
                "Under R2,000",
                "R2,001 – R5,000",
                "R5,001 – R10,000",
                "R10,001 – R20,000",
                "Above R20,000",
                "Prefer not to say"
            ]
        },
        shoppingPreference: {
            type: String,
            enum: ["Online", "Walk-in (in-store)", "Both equally"]
        },
        interestCategories: {
            type: [String],
            enum: [
                "Food & Takeaways",
                "Beauty & Grooming",
                "Fashion & Accessories",
                "Health & Wellness",
                "Electronics & Gadgets",
                "Travel & Experiences",
                "Home & Décor",
                "Spiritual / Holistic",
                "Auto & Transport",
                "Entertainment (Events, Streaming)",
                "Data & Mobile Packages",
                "Education & Online Learning",
                "Groceries & Household Essentials",
                "Kids & Family"
            ],
            validate: [v => v.length <= 7, "Maximum 7 interests allowed"]
        },
        preferredDeals: {
            type: [String],
            enum: [
                "Discounts & vouchers",
                "Combo deals (e.g. Meal + Spa)",
                "Flash sales / limited time offers.",
                "Buy one, get one free.",
                "Cashback or store credit",
                "Free gifts with purchase",
                "First access to new products",
                "Loyalty stamp rewards",
                "Bulk-buy discounts."
            ],
            validate: [v => v.length <= 6, "Maximum 6 deal preferences allowed"]
        },
        giveawayPreferences: {
            type: [String],
            enum: [
                "Cash prizes",
                "Vouchers / Store Credit",
                "Tech (Phones, Laptops, Gadgets)",
                "Fashion / Brand Merch",
                "Restaurant or Spa Experiences",
                "Shopping Sprees",
                "House or Rent for a Year",
                "Groceries for a Month",
                "Flights or Travel Packages",
                "School Fees or Education Support",
                "Car or Transport Vouchers",
                "Business Startup Kits"
            ],
            validate: [v => v.length <= 6, "Maximum 6 giveaway preferences allowed"]
        },
        rewardEngagementFrequency: {
            type: String,
            enum: ["Daily", "Weekly", "Occasionally", "Rarely"]
        },
        preferredNotificationMethod: {
            type: String,
            enum: ["Email", "SMS", "WhatsApp", "App Push Notifications"]
        },

    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.virtual("memberships", {
    ref: "Membership",
    localField: "_id",
    foreignField: "userId",
});
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
