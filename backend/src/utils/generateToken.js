import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = '1h') => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables.");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};


export const generateResetToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET + '-reset',
        { expiresIn: '10m' } 
    );
};
