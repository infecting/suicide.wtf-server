const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
    user_agent: { type: String, required: true },
    ip: { type: String, required: true },
    ja3: { type: String, required: true },
    h2: {type: String, required: true},
    peetprint: {type: String, required: true},
    time: {type: Number, required: true}
}, { timestamps: true })


module.exports = mongoose.model("Request", requestSchema);
