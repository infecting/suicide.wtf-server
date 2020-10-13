const mongoose = require("mongoose");

const binSchema = mongoose.Schema({
    text: { type: String, required: true },
    ip: { type: String, required: true }
}, { timestamps: true })


module.exports = mongoose.model("Bin", binSchema);