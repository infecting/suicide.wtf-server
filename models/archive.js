const mongoose = require("mongoose");

const archiveSchema = mongoose.Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
    ip: { type: String, required: true }
}, { timestamps: true })


module.exports = mongoose.model("Archive", archiveSchema);