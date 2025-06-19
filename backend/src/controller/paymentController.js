import axios from "axios";

export const createHostedCheckout = async (req, res) => {
  try {
    const { amount, currency = "ZAR", userId } = req.body;
    console.log("Req came " , req.body);
    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing amount or userId" });
    }

    const response = await axios.post(
      `${process.env.PEACH_BASE_URL}/checkout/initiate`,
      null, 
      {
        params: {
          entityId: process.env.PEACH_ENTITY_ID,
          amount,
          currency,
          paymentType: "DB", 
          merchantTransactionId: `txn_${userId}_${Date.now()}`,
          shopperResultUrl: `${process.env.FRONTEND_URL}/payment-result`,
         
          "customParameters[USER_ID]": userId,
        },
      }
    );
    console.log("This is the response" , response?.data);
    const redirectUrl = response.data?.redirect_url;
    console.log("THis is the redirect URL" , redirectUrl);
    if (!redirectUrl) {
      return res.status(500).json({ error: "No redirect URL received" });
    }

    res.status(200).json({ redirectUrl });
  } catch (error) {
    console.error("Hosted Checkout Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
