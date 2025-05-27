export const verifyCaptcha = async (captchaToken) => {
    try {
        if (!captchaToken) {
            throw new Error("Captcha token is missing");
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

        const { data } = await axios.post(verificationUrl, null, {
            params: {
                secret: secretKey,
                response: captchaToken,
            },
        });

        if (!data.success) {
            throw new Error("Captcha verification failed");
        }

        return true; // ✅ Success
    } catch (error) {
        console.error("Captcha verification error:", error.message);
        return false; // ❌ Failure
    }
};
