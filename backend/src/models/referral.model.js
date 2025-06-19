import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'referrerModel'
    }, //this is saying a referrer can be the user and affiliate (like the person who share there code)
    referrerModel: {
        type: String,
        required: true,
        enum: ['User', 'Affiliate']
    },
    referred: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'referredModel'
    },//this is saying a referred person can be user or affiliate (like the person who used the code)
    referredModel: {
        type: String,
        required: true,
        enum: ['User', 'Affiliate']
    },

}, { timestamps: true });

export default mongoose.model("ReferralModel" , referralSchema);
