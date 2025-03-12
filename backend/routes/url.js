const express=require("express");
const {handleGenerateNewShortUrL,handleRedirectShortUrL,handleClickCounts}=require("../controllers/url")
const {restrictToLoggedInUserOnly}=require("../middlewares/auth")
const router=express.Router();

router.post("/",restrictToLoggedInUserOnly,handleGenerateNewShortUrL);
router.get("/:shortId",handleRedirectShortUrL);
router.get("/analytics/:shortId",restrictToLoggedInUserOnly,handleClickCounts);

module.exports=router;