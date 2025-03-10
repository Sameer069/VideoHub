const express=require("express")
const routes=express.Router();
const userModel=require("../model/user")
const videoModel=require("../model/video")
const jwt=require("jsonwebtoken")
const mongoose =require("mongoose")
const multer=require("multer")
const crypto=require("crypto")
const path=require("path");
const commentModel = require("../model/comments");
const { isuserLoggedin } = require("../middleware/userauth");


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"../backend/upload")
    
  },
  filename:function(req,file,cb){
    crypto.randomBytes(12,function(err,bytes){
      const fileName=bytes.toString("hex") + path.extname(file.originalname)
     cb(null,fileName)
    })

  }
})

const upload=multer({storage:storage})
routes.get("/",(req,res)=>{
  res.send("Hell backend")
})


routes.post("/user-register",async(req,res)=>{
   const user={
    user_name:req.body.Username,
    email:req.body.email,
    password:req.body.password
   }
   const existUser=await userModel.findOne({$or:[{email:user.email},{user_name:user.user_name}]})

   if(existUser){
      if(existUser.email===user.email){
        return res.status(401).json({msg:"email already exist"})
      }
      else if(existUser.user_name===user.user_name){
        return res.status(402).json({msg:"user_name already taken"})
      }
   
   }
   else{
    await  userModel.create(user)
    res.status(200).json({msg:"succes"})
    
   }

  
    
})
routes.post("/user-login",async(req,res)=>{
    const user={
        email:req.body.email,
        password:req.body.password
    }
    const response=await userModel.findOne({email:user.email})
    if(response){
      if(response.password===user.password){
        const playload=response.toObject()
        delete playload.password
        const userData=jwt.sign(playload,process.env.JWT_SECRET)
        res.cookie("token",userData,{
          httpOnly:true,
          secure:false,
          sameSite:"None"
        })
      
       return res.status(200).json({msg:"succes",userData,response})
      }
      else{
       return res.status(400).json({msg:"password incorrect"})
      }
    }
    else{
     return res.status(404).json({msg:"email not found"})
    }
})
 routes.post("/change-password",async(req,res)=>{
      const{ChangeEmail,ChangePassword}=req.body
      const ExistUserCheck=await userModel.findOne({email:ChangeEmail})
       if(ExistUserCheck){
       const changeuser= await userModel.findByIdAndUpdate(ExistUserCheck._id,{password:ChangePassword})
        return res.status(200).json({msg:"changed"})
       }
      
      res.status(404).json({msg:"User Not Found"})
  
    
  })

 routes.post("/user-profile-update",upload.single("File"),async(req,res)=>{
      const {userid}=req.body
      const userUpdate =await userModel.findByIdAndUpdate(userid,{profile:req.file.filename},{new:true})
      const commentUpdate=await commentModel.updateMany({user_id:userUpdate._id},{$set:{commentProfile:req.file.filename}})

      res.send("Profile Updated")
  
 })
 routes.get("/upload/:file",async(req,res)=>{
  const imagePath=path.join(__dirname,"..","upload",req.params.file)

  res.sendFile(imagePath,err=>{
    if(err){
      res.status(404).json({errFile:"image not found"})
    }
  })
 })
 routes.get("/get-user/:id",isuserLoggedin,async(req,res)=>{

    
      if(req.user){
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: 'Invalid user ID' });
           }
            const userDetails=await userModel.findById(req.params.id).select("-_id profile user_name ")
            
            if(userDetails){
              // const token=req.user 
              //  jwt.verify(token,"sam@12",(err,decode)=>{
              // if(err) return res.status(400).json({msg:"Invalid cookies"})
             
            // })
            res.status(200).json({msg:"fetched",imageUrl:`http://127.0.0.1:3003/upload/${userDetails.profile}`,userDetails})    
      
            }
            else{
              res.status(404).json({msg:"Unauthorized acces"})
            }
      }
      else{
        res.send("Unauthorized")
      }
            
  
   
    
 })


 routes.post("/add-like",upload.none(),isuserLoggedin,async(req,res)=>{
    const user=await userModel.findById(req.body.userid).select("_id user_name email")
    const video=await videoModel.findOne({url:req.body.videoUrl})
    if(video && user){
      if(video.like.indexOf(user._id)===-1){
        video.like.push(user)
        await video.save()
        res.status(200).json({msg:"Like submit"})
      }
    }
    else{
      res.status(404).json({msg:"Invalid User"})
    }
  
 
 })
module.exports=routes