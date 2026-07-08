const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const token = req.headers.token;

    if (!token) {
        return res.json({
            message: "Login Required"
        });
    }

    try {
        const data = jwt.verify(
            token,
            "SECRET_KEY"
        );

        req.user = data;

        next();
    }
    catch {
        return res.json({
            message: "Invalid Token"
        });
    }
}

module.exports = auth;