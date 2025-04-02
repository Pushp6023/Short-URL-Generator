const express = require("express");
const app = express();
const PORT = 8002;
const URL = require('./models/url');
const path = require("path");
const UrlRoute = require('./routes/url');
const staticRoute = require("./routes/staticRouter");
const connectMongoDB = require('./connection');
connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log('MongoDB connected'));
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