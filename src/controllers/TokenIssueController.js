const jwt = require("jsonwebtoken");

//=====create jwt parts====//
exports.tokenIssue = (req, res) => {

    let payLoad = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: { "name": "Md.Humayun Kabir", "City": "Bhola" }
    }
    let Token = jwt.sign(payLoad, "SecretKey123");
    res.send(Token)

}