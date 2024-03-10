const jwt = require("jsonwebtoken");

//=====create jwt parts====//
exports.createJwt = (req, res) => {

        let payLoad = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { "name": "Md.Humayun Kabir", "City": "Bhola" }
        }
        let Token = jwt.sign(payLoad, "SecretKey123");
        res.send(Token)

    }
    //=====decode jwt parts====//
exports.decodeJwt = (req, res) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token, "SecretKey123", (error, decoded) => {
        if (error) {
            res.status(401).json({ status: "Invalid Token", data: error })
        } else {
            res.status(200).json({ status: "success", data: decoded })
        }
    })
}