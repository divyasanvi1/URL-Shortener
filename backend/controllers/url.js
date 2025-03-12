const {nanoid} =require("nanoid");
const URL=require('../models/url');

async function handleGenerateNewShortUrL(req,res){
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ msg: "URL is required" });

        const shortID = nanoid(8);
        await URL.create({ shortId: shortID, redirectURL: url, visitHistory: [] });

        return res.json({ id: shortID });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function handleRedirectShortUrL(req,res){
       const shortId=req.params.shortId;
       console.log(shortId);
       const entry=await URL.findOneAndUpdate({
             shortId
       },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
       },},
       { new: true })
       res.redirect(entry.redirectURL);
}

async function handleClickCounts(req,res){
    try {
        const { shortId } = req.params;
        const entry = await URL.findOne({ shortId });
        if (!entry) return res.status(404).json({ msg: "URL not found" });

        return res.json({ totalClicks: entry.visitHistory.length, analytics: entry.visitHistory });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports={
    handleGenerateNewShortUrL,
    handleRedirectShortUrL,
    handleClickCounts,
}