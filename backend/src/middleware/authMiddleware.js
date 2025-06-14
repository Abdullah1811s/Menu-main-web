import jwt from 'jsonwebtoken'


export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json({ message: "Unauthorized Access!!" });
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = verifyToken;
        next();
    } catch (error) {
        console.log("Error in auth middleware ", error.message);
        return res.status(401).json({ message: "Authentication failed" });

    }
}


export const authorization = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            req.userDetail = req.user;
            return res.status(403).json({ error: "Forbidden: You are not allowed to do this operation" });
        }
        next();
    };
}