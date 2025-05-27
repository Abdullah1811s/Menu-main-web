import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const affiliateSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    type: { type: String, enum: ["individual", "business"], required: true, trim: true },
    businessName: { type: String, default: null, trim: true },
    companyRegistrationNumber: { type: String, default: null, trim: true },
    vatNumber: { type: String, default: null, trim: true },
    tradingAddress: { type: String, default: null, trim: true },
    provinceCity: { type: String, default: null, trim: true },
    businessContactNumber: { type: String, default: null, trim: true },
    businessEmailAddress: { type: String, default: null, trim: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        trim: true
    },
    
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        validate: {
            validator: function (value) {
                return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
    },

    socialMediaPlatforms: [{
        type: String,
        enum: ["Instagram", "TikTok", "Facebook", "YouTube", "Twitter/X", "WhatsApp Broadcast Groups", "Blogs / Websites", "Other"],
        trim: true
    }],

    estimatedAudienceReach: {
        type: String,
        enum: [
            "Under 5,000",
            "5,001 – 20,000",
            "20,001 – 50,000",
            "50,001 – 100,000",
            "Over 100,000"
        ],
       
    },

    contentTypes: {
        type: [String],
        enum: [
            "Lifestyle",
            "Fashion / Beauty",
            "Food & Drink",
            "Travel & Experiences",
            "Comedy / Entertainment",
            "Business / Finance",
            "Family & Parenting",
            "Fitness & Health",
            "Reviews & Product Drops",
            "Inspirational / Motivational"
        ],
        validate: [v => v.length <= 5, "Maximum 5 content types allowed"],
        trim: true
    },

    affiliateGoals: {
        type: [String],
        enum: [
            "Earn recurring commissions.",
            "Promote latest brands.",
            "Gain first access to vendor deals.",
            "Collaborate with top vendors.",
            "Get featured by The Menu",
            "Access sponsored trade campaigns",
            "Build influence in a niche market.",
            "Lead giveaways & raffles."
        ],
        validate: [v => v.length <= 5, "Maximum 5 goals allowed"],
       
    },

    currentBrandAffiliation: {
        type: String,
        enum: ["Yes", "No", "Planning to start soon."],
       
    },

    preferredBrandTypes: {
        type: [String],
        enum: [
            "Local / Township Businesses",
            "Health & Wellness",
            "Fashion & Beauty",
            "Food & Beverage",
            "Tech & Gadgets",
            "Auto / Transport",
            "Entertainment / Lifestyle",
            "High-End / Luxury",
            "Education & Training"
        ],
        validate: [v => v.length <= 5, "Maximum 5 preferred brand types allowed"],
        
    },

    sharingFrequency: {
        type: String,
        enum: ["Daily", "Weekly", "Bi-weekly", "Monthly", "Ad hoc, based on campaign fit."],
        
    },

    openToFeature: {
        type: String,
        enum: ["Yes", "No", "Depends on campaign type."],
        
    },

    targetAudience: { type: String, default: null, trim: true },
    referralCode: { type: String, trim: true },
    bankName: { type: String, required: true, trim: true },
    accountHolder: { type: String, required: true, trim: true },

    accountNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{5,20}$/.test(v);
            },
            message: 'Account number must be 5-20 digits'
        }
    },

    branchCode: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{4,10}$/.test(v);
            },
            message: 'Branch code must be 4-10 digits'
        }
    },

    bankConfirmationUrl: {
        public_id: { type: String },
        secure_url: { type: String }
    },

    totalR10: { type: Number },
    totalR50: { type: Number },
    idNumber: { type: String, trim: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
}, { timestamps: true });

affiliateSchema.pre("save", function (next) {
    if (this.type === "individual") {
        this.businessName = null;
        this.companyRegistrationNumber = null;
        this.vatNumber = null;
        this.tradingAddress = null;
        this.provinceCity = null;
        this.businessContactNumber = null;
        this.businessEmailAddress = null;
    }
    next();
});

affiliateSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

affiliateSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("Affiliate", affiliateSchema);
