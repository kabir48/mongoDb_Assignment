const StudentModel = require('../models/StudentModel');

// ====Data View====//
exports.Index = async(req, res) => {
    try {
        let result = await StudentModel.aggregate([
            { $project: { _id: 0 } }
        ]);

        return res.json({ message: "All Data View", data: result })

    } catch (error) {
        return res.json({ error: error.message || "Internal Server Error" });
    }
}

// ====Data Store====//
exports.store = async(req, res) => {
    try {
        let reqBody = req.body;
        //console.log(reqBody)
        await StudentModel.create(reqBody);
        return res.json({ message: "Items Created Successfully" })
    } catch (error) {
        return res.json({ error: error.message || "Internal Server problem" })
    }
}

// ====Data Delete====//
exports.destroy = async(req, res) => {
        try {
            let { id } = req.params;
            await StudentModel.deleteOne({
                _id: id
            });
            return res.json({ message: "Item Deleted Successfully" });
        } catch (error) {
            return res.json({ error: error.message || "Internal Server problem" })
        }
    }
    //===add Extra column===//

exports.extra = async(req, res) => {
    try {
        let ans = await StudentModel.updateMany([
            { $set: { section: "B" } }
        ]);
        return res.json({ message: "Extra Field Added Successfully", data: ans });
    } catch (error) {
        return res.json({ error: error.message || "Internal Server problem" })
    }
}


exports.update = async(req, res) => {
    try {
        let { id } = req.params;
        let reqBody = req.body
        let ans = await StudentModel.updateOne({ _id: id }, reqBody)
        return res.json({ message: "Updated Successfully", data: ans });
    } catch (error) {
        return res.json({ error: error.message || "Internal Server problem" })
    }
}