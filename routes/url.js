const express=require("express");
const {handleGenerateNewShortUrL,handleRedirectShortUrL,handleClickCounts}=require("../controllers/url")
const router=express.Router();

router.post("/",handleGenerateNewShortUrL);
router.get("/:shortId",handleRedirectShortUrL);
router.get("/analytics/:shortId",handleClickCounts);

module.exports=router;