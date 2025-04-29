import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    // Check token from Authorization header first
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.split(" ")[1];
    
    // Check token from cookies
    const tokenFromCookie = req.cookies?.token;
    
    // Use either token
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default isAuthenticated;