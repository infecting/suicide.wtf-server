const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
    link: { type: String, required: true },
    slug: { type: String, required: true },
    ip: { type: String, required: true }
}, { timestamps: true })


module.exports = mongoose.model("Link", linkSchema);