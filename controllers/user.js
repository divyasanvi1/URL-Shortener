const User=require("../models/user")
const {v4:uuidv4}=require("uuid");
const {setUser}=require("../service/auth")

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    const result=await User.create({
        name,
        email,
        password
    })
    return res.json({name:result.name,email:result.email})
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({
        email,
        password
    })
    if(!user){
        return res.json({msg:"InvalidUser"})
    }
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.json({name:result.name,email:result.email})
}

module.exports={
    handleUserSignUp,
    handleUserLogin,
}