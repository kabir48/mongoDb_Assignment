let mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    name: String,
    roll: String,
    class: String,
    remarks: String
}, { timestamps: true, versionKey: false });
const StudentModel = mongoose.model('students', dataSchema);
module.exports = StudentModel