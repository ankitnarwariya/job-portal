const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken) {
            return res.status(401).json({
                message: "Unauthorized: Token is missing"
            });
        }

        const decoded = jwt.verify(headerToken, process.env.JWT_SECRET_KEY);

        req.userId = decoded.userId;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({
            status: "Invalid Token"
        });
    }
};

module.exports = verifyToken;
