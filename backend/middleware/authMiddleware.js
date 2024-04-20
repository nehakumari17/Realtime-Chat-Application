const JWT = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).send({ message: "User not authenticated." });
        }
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).send({ message: "Invalid token." });
        }
        req.id = decoded.id;
        next(); 
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = isAuthenticated;
