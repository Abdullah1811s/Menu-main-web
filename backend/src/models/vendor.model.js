  import mongoose from "mongoose";
  import bcrypt from "bcryptjs";

  const VendorSchema = new mongoose.Schema(
    {

      businessName: { type: String, required: true },
      businessType: { type: String, required: true },
      companyRegNumber: { type: String, required: true },
      vatNumber: { type: String },
      tradingAddress: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      businessContactNumber: { type: String, required: true },
      businessEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },


      websiteUrl: { type: String },
      businessDescription: { type: String },
      agreedToTerms: { type: Boolean, required: true },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },


      representativeName: { type: String, required: true },
      representativePosition: { type: String, required: true },
      representativeEmail: { type: String, required: true, trim: true },
      representativePhone: { type: String, required: true },


      socialMediaHandles: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        tiktok: { type: String },
      },


      raffleOffer: {
        type: {
          type: String,
        },
        terms: { type: String },
        offerings: [
          {
            name: { type: String, required: true },
            quantity: { type: Number },
            endDate: { type: Date },
          },
        ],
      },


      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        validate: {
          validator: function (value) {
            return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
          },
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
      },



      vendorTier: {
        type: String,
        enum: ["bronze", "silver", "gold"],
        default: "bronze",
      },
      referralCodeUsed: { type: String },


      companyRegistrationCertificateURl: {
        public_id: { type: String },
        secure_url: { type: String },
      },
      vendorIdURl: {
        public_id: { type: String },
        secure_url: { type: String },
      },
      addressProofURl: {
        public_id: { type: String },
        secure_url: { type: String },
      },
      confirmationLetterURl: {
        public_id: { type: String },
        secure_url: { type: String },
      },
      businessPromotionalMaterialURl: {
        public_id: { type: String },
        secure_url: { type: String },
      },


      productServiceCategories: [
        {
          type: String,
          enum: [
            "Food & Beverage",
            "Fashion & Accessories",
            "Health & Beauty",
            "Fitness & Wellness",
            "Home Services / DIY",
            "Education & Training",
            "Digital / Online Services",
            "Travel / Hospitality",
            "Auto & Mechanical",
            "Spiritual / Holistic",
            "Retail Products",
            "Events & Entertainment",
            "Professional Services",
            "Other",
          ],
          maxLength: 4,
        },
      ],
      businessPresence: {
        type: String,
        enum: ["Physical store only", "Online only", "Both"],
      },
      customerEngagementPlatforms: [
        {
          type: String,
          enum: [
            "In-store",
            "WhatsApp",
            "Instagram / Facebook",
            "Website / eCommerce",
            "Phone / SMS Orders",
            "TikTok or YouTube",
            "Other",
          ],
        },
      ],
      preferredPromotionTypes: [
        {
          type: String,
          enum: [
            "Discounts / Coupons",
            "Flash Deals (Limited Time)",
            "Giveaways or Raffles",
            "Combo Deals (e.g. 2-for-1)",
            "Loyalty Stamps (e.g. Buy 5, Get 1 Free)",
            "First-Time User Rewards",
            "Exclusive Menu Member Offers",
            "Trade Promotions",
            "Spin the Wheel Participation",
          ],
        },
      ],



      typicalDealValue: {
        type: String,
        enum: [
          "Under R50",
          "R51–R100",
          "R101–R250",
          "Over R250",
          "Depends on offer type.",
        ],
      },

      offerFrequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Occasionally / On-Demand"],
      },
      
      businessGoalsOnMenu: [
        {
          type: String,
          enum: [
            "Increase brand visibility.",
            "Drive foot traffic / online orders.",
            "Gain repeat customers.",
            "Take part in trade promotions.",
            "Evaluate latest offers.",
            "Get insights / analytics.",
            "Collaborate with affiliates.",
            "Grow in township markets.",
            "Reach new customer segments.",
          ],
        },
      ],

      vendorVoucher:{
        type:String
      },

      resetPasswordToken: { type: String },
      resetPasswordExpire: { type: Date },
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      timestamps:true
    }
  );


  VendorSchema.virtual("wheelOffers", {
    ref: "Wheel",
    localField: "_id",
    foreignField: "createdBy.userId",
    justOne: false,
  });


  VendorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


  VendorSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  export default mongoose.model("Vendor", VendorSchema);
