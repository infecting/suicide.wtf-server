const mongoose = require("mongoose");

const pxSchema = mongoose.Schema({
    payload: { type: Array, required: true },
    uuid: { type: String, required: true },
    startTime: { type: String, required: true },
    extra: {type: Map, required: true}
}, { timestamps: true })


module.exports = mongoose.model("PX", pxSchema);