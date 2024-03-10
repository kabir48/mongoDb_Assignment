let ProfileModel = require('../models/ProfileModel');
var jwt = require('jsonwebtoken');
exports.register = async(req, res) => {
    try {
        let bodyData = req.body;
        await ProfileModel.create(bodyData);
        return res.json(200, { message: "Items Created Successfully", data: bodyData })

    } catch (error) {
        return res.json({ error: error.message || "Internal Server problem" });
    }
}

// exports.count = async(req, res) => {
//     let count = await ProfileModel.find().count('total');
//     return res.json(200, { message: "Result:", data: count })
// }

//====Login Parts====//
exports.login = (req, res) => {
    try {
        let username = req.body['username'];
        let password = req.body['password'];
        let headBody = req.body;
        ProfileModel.find({ username: username, password: password }, (error, data) => {
            if (error) {
                res.status(400).json({ status: "fail", data: error })
            } else {
                ProfileModel.find().count('total')
                    .then(count => {
                        if (count > 0) {
                            let payLoad = { exp: Math.floor(Date.now() / 1000) + (5 * 24 * 60 * 60), data: headBody['username'] };
                            let token = jwt.sign(payLoad, "secretKey123");
                            res.status(200).json({ status: "success", token: token, data: data[0] });
                        } else {
                            res.status(401).json({ status: "unauthorized" });
                        }
                    })
                    .catch(error => {
                        console.error('Error querying the database:', error);
                        res.status(500).json({ status: "error", message: "Internal Server Error" });
                    });

            }
        });
    } catch (error) {
        res.json({ error: error.message || "Server Error" })
    }

}

//===All Profile====//

exports.allProfile = async(req, res) => {
    try {
        await ProfileModel.aggregate([{ $project: { _id: 0 } }], (error, data) => {
            if (error) {
                res.status(400).json({ status: "fail", data: error })
            } else {
                res.status(200).json({ status: "success", data: data });
            }

        });
    } catch (error) {
        res.json({ error: error.message || "Server Error" })
    }
}

//====single profile==//

exports.singleProfile = async(req, res) => {
    try {
        let username = req.headers['username'];
        let single = await ProfileModel.aggregate([{
            $match: { username: username },
        }, { $project: { _id: 0, password: 0 } }]);
        //console.log(single)

        res.json({ status: "success", value: single });
    } catch (error) {
        res.json({ error: error.message || "Server Error" })
    }
}

exports.updateProfile = async(req, res) => {
    try {
        let username = req.headers['username'];
        let headBody = req.body;
        let single = await ProfileModel.updateOne({ username: username }, headBody)
            //console.log(single)

        res.json({ status: "update data success", value: single });
    } catch (error) {
        res.json({ error: error.message || "Server Error" })
    }
}