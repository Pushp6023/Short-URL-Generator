const shortid = require("shortid");
const URL = require('../models/url');
async function handleGenerateNewShortId(req, res)
{
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json({error: 'URL is required'});
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id: shortID,
    });
}
async function handleGetAnalytics(req, res)
{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({TotalClicks: result.visitHistory.length,
                    Analytics: result.visitHistory,});
}
module.exports = {
    handleGenerateNewShortId,
    handleGetAnalytics,
}