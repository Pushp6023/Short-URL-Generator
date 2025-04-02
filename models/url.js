const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectUrl: {
            type: String,
            required: true,
        },
        visitHistory: [{ timestamp: {type: String}}],
    },
    {timestamps: true}
);
const URL = mongoose.model("url", schema);
module.exports = URL;