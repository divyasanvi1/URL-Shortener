const express=require("express");
const urlRoute=require("./routes/url");
const {connectToMongoDb}=require("./connect");

const app=express();
const PORT=8001;

app.use(express.json())
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("mongoDb Connected"))
console.log("mongoDb Connected after")


app.use("/url",urlRoute);

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`))