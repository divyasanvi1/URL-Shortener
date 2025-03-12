const {getUser}=require("../service/auth")

async function restrictToLoggedInUserOnly(req,res,next) {
    console.log("restrictToLoggedInUserOnly",req);
    const userUid=req.cookies.uid;
    if(!userUid) return res.json({msg:"Please login"});
    const user=getUser(userUid);
    if(!user) return res.json({msg:"Please login"});
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedInUserOnly,
}