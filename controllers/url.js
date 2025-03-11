const {nanoid} =require("nanoid");
const URL=require('../models/url');

async function handleGenerateNewShortUrL(req,res){
    const body=req.body;
    if(!body.url)
    {
        return res.status(400).json({msg:"URL is required"})
    }
    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.json({id:shortID});
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
       },})
       res.redirect(entry.redirectURL);
}

async function handleClickCounts(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({
          shortId
    });
   return res.json({totalClicks:entry.visitHistory.length,
    analytics:entry.visitHistory,
   });
}

module.exports={
    handleGenerateNewShortUrL,
    handleRedirectShortUrL,
    handleClickCounts,
}