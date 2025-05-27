import rateLimit from 'express-rate-limit';

const RateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 20, 
    message: { error: "Too many requests at this moment. Please try again later." },
    headers: true, 
});


export default RateLimiter;
