let ToDoModel = require("../models/ToDoModel");

//===create Todo part===//
exports.createTodo = async(req, res) => {
    try {
        let bodyData = req.body;
        let username = req.headers['username'];
        bodyData.username = username;
        await ToDoModel.create(bodyData, (error, data) => {
            if (error) {
                return res.json({ status: "Fail", data: error });
            } else {
                return res.json({ status: "success", data: data })
            }
        })

    } catch (error) {
        return res.json({ error: error.message || "Server Error" })
    }
}

//===update Todo===//
exports.updateTodo = (req, res) => {
        try {

            let username = req.headers['username'];
            let bodyData = req.body;
            ToDoModel.updateOne({ username: username }, bodyData, (error, data) => {
                if (error) {
                    return res.json({ status: "Error", data: error })
                } else {
                    return res.json({ status: "success", data: data })
                }
            })

        } catch (error) {
            return res.json({ error: error.message || "Server Error" })
        }
    }
    //===read  todo===//
exports.readTodo = async(req, res) => {
        try {
            let username = req.headers['username'];
            let single = await ToDoModel.aggregate([{ $match: { username: username } }, { $project: { _id: 0, username: 0 } }]);

            return res.json({ status: "success", data: single });
        } catch (error) {
            return res.json({ error: error.message || "Server Error" })
        }
    }
    //====Delete Todo Parts===//

exports.deleteTodo = async(req, res) => {
    try {
        let username = req.headers['username'];
        let deleteData = await ToDoModel.deleteOne({ username: username });

        return res.json({ status: "success", data: deleteData });
    } catch (error) {
        return res.json({ error: error.message || "Server Error" })
    }
}

//====complete Todo Parts====//

exports.completeTodo = (req, res) => {
    try {
        let username = req.headers['username'];
        let bodyData = req.body;
        let status = bodyData['status'];

        if (status === 'completed') {
            bodyData = { 'pass': 'yes', 'complete': true, 'status': status };
            ToDoModel.updateOne({ username: username }, bodyData,
                (error, updateResult) => {
                    if (error) {
                        return res.json({ status: "Error", data: error });
                    } else {
                        return res.json({ status: "Todo Completed", data: updateResult });
                    }
                }
            );
        } else {
            bodyData = { 'pass': 'cancel marks', 'complete': false, 'status': status };
            ToDoModel.updateOne({ username: username }, bodyData,
                (error, updateResult) => {
                    if (error) {
                        return res.json({ status: "Error", data: error });
                    } else {
                        return res.json({ status: "Todo Completed", data: updateResult });
                    }
                }
            );
        }
    } catch (error) {
        return res.json({ error: error.message || "Server Error" });
    }

}