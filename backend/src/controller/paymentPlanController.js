import PaymentPlan from "../models/paymentPlan.js";


export const createPaymentPlan = async (req, res) => {
    try {
        const {
            label,
            cost,
            vendorAccess,
            entries,
            entryBanking,
            durationInDays,
            durationType,
            leaderboardEligible
        } = req.body;

        const plan = new PaymentPlan({
            label,
            cost,
            vendorAccess,
            entries,
            entryBanking,
            durationInDays,
            durationType,
            leaderboardEligible
        });

        await plan.save();
        res.status(201).json({ success: true, message: "Payment plan created successfully", data: plan });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updatePaymentPlan = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            label,
            cost,
            vendorAccess,
            entries,
            entryBanking,
            durationInDays,
            durationType,
            leaderboardEligible
        } = req.body;

        const updatedPlan = await PaymentPlan.findByIdAndUpdate(
            id,
            {
                label,
                cost,
                vendorAccess,
                entries,
                entryBanking,
                durationInDays,
                durationType,
                leaderboardEligible
            },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ error: "Payment plan not found" });
        }

        res.status(200).json({success:true ,  message: "Payment plan updated successfully", data: updatedPlan });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
