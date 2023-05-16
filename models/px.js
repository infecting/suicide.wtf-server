const mongoose = require("mongoose");

const pxSchema = mongoose.Schema({
    payload: { type: Array, required: true },
    uuid: { type: String, required: true },
    startTime: { type: String, required: true },
    extra: {type: Map, required: true},
    user_agent: {type: String, required: false}
}, { timestamps: true })


module.exports = mongoose.model("PX", pxSchema);