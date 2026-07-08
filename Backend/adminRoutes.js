const jwt = require("jsonwebtoken");

app.post("/admin-login", (req, res) => {

    const { email, password } = req.body;

    if (
        email === "boss@gmail.com" &&
        password === "boss123"
    ) {

        const token = jwt.sign(
            {
                role: "admin"
            },
            "SECRET_KEY"
        );

        res.json({
            success: true,
            token: token
        });

    } else {

        res.json({
            success: false,
            message: "Invalid Login"
        });

    }

});