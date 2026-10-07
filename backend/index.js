const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

app.post("/register", (req, res)=>{
    const {email,password}=req.body;

    res.status(201).send({success: true,message:"account created"});

});

app.post("/login", (req, res)=>{
      const {email,password}=req.body;

    res.status(201).send({success: true,message:"Login successful"});
});


app.listen(8000, (error)=>{
    if(error) throw error;
    console.log("Server started");
});