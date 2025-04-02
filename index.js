const express = require("express");
const app = express();
const URL = require('./models/url');
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 8002;
const UrlRoute = require('./routes/url');
const staticRoute = require("./routes/staticRouter");
const connectMongoDB = require('./connection');
connectMongoDB('process.env.MONGO_URL').then(() => console.log('MongoDB connected'));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", staticRoute);
app.use("/url", UrlRoute);
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });
    res.redirect(entry.redirectUrl);
});
app.listen(PORT, () => {console.log(`Server started at PORT: ${PORT}`)});