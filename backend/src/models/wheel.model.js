import mongoose from 'mongoose';

const offeringSchema = new mongoose.Schema(
    {
        term: { type: String, trim: true },
        label: { type: String, lowercase: true, trim: true },
        quantity: { type: Number, default: 1 },
        endDate: {
            type: Date,
            required: [true, 'Please enter an end date'],
        },
        extraInfo: {
            type: String
        }
    },
    { _id: true }
);

const wheelSchema = new mongoose.Schema(
    {
        createdBy: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'createdBy.userType',
            },
            userType: {
                type: String,
                required: true,
                enum: ['Admin', 'Vendor'],
            },
        },
        offering: [offeringSchema],
    },
    { timestamps: true }
);

export default mongoose.model('Wheel', wheelSchema);
