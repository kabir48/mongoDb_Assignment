const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token, "secretKey123", (error, decodeData) => {
        if (error) {
            res.status(401).json({ status: "Invalid Token", data: error })
        } else {
            // console.log(decodeData['data'])
            req.headers.username = decodeData['data'];
            next()
        }
    })

    //need to apply token where middleware is created in the route
}