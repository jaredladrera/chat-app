const jsonwebtoken = require("jsonwebtoken");


const checkingToken = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');

        if(token) {
            token = token.slice(7);
            jsonwebtoken.verify(token, "userLogin", (err, deoded) => {
                if(err) {
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    })
                } else {
                    next();
                }
            })
        } else {
            res.json({
                success: 0,
                message: "Access denied unauthorize user"
            })
        }
    }
}

module.exports = checkingToken;