
const express=require("express")
const routes=express.Router()
const videoModel=require("../model/video")
const userModel = require("../model/user")
const commentModel=require("../model/comments")
const categoryModel=require("../model/category")
const multer=require("multer")

const upload=multer()
routes.post("/admin-login",async(req,res)=>{
  
})
routes.post("/admin/add-video",async(req,res)=>{
     const{title,description,category,userid,url}=req.body
     const user=await userModel.findOne({user_name:userid})
     
      const videoAdd=await videoModel.create({
        user_id:user._id,
        title:title,
        description:description,
        url:url,
        category:category

      }) 
      const categories=await categoryModel.create({
        category:category,
        categoryId:user._id,
        urlId:url
      })
     user.post_video.push(videoAdd)
     await user.save()
     res.status(200).json({msg:"Video added"})
})

routes.get("/get-videos",async(req,res)=>{
      const allvideo=await videoModel.find({}).populate("user_id","user_name profile")
     
      res.status(200).json({msg:"fetched",allvideo})
})
routes.get("/get-videos/:id",async(req,res)=>{
  const videoUrl=`${req.params.id}?si=${req.query.si}`
  
  const allvideo=await videoModel.findOne({url:videoUrl}).populate("user_id") 
  
    if(allvideo){
      if(allvideo.url==videoUrl){
        res.status(200).json({msg:"video fetched",allvideo})
       }
       else{
        res.status(404).json({msg:"video not found"})
       }
    }
    else{

      res.status(404).json({msg:"video not found"})
    }
})
routes.post("/comment",upload.none(),async(req,res)=>{

   const videoComment=await videoModel.findOne({url:req.body.videoId}).select("comments user_id")
   const userComment=await userModel.findById(req.body.userCmtid)
   const userCommentPush=await commentModel.create({
       user_id:userComment._id,
       comments:req.body.Usercomment,
       user_name:userComment.user_name,
       commentProfile:userComment.profile
   })
   if(videoComment){
    videoComment.comments.push(userCommentPush)
   }
   await videoComment.save()

  
   res.status(200).json({msg:"Comment added"})

})
routes.get("/commentlist/:videoid",async(req,res)=>{
      const searchId=req.params.videoid
      const querySearchId=req.query.si
       const videoUrl=`${searchId}?si=${querySearchId}`
      const videoComment=await videoModel.findOne({url:videoUrl})
     
      if(videoComment){
      res.status(200).json({msg:"fetched..",videoComment})

      }
      else{
        res.status(404).json({msg:"OPPS.."})
      }
     
      

})
routes.get("/categories",async(req,res)=>{
    const categories=await categoryModel.find({}).select("category urlId")
    res.status(200).json({categories,msg:"category fetched"})
})
routes.post("/add-video-list",upload.none(),async(req,res)=>{
     
      const user=await userModel.findOne({_id:req.body.userWatchid})
      const videoView=await videoModel.findOne({url:req.body.urlid}).populate("user_id","user_name profile")
      delete videoView._id
      if(videoView){
        if(videoView.views.indexOf(user._id)==-1){
           videoView.views.push(user._id)  
           await videoView.save()
           
           res.status(200).json({msg:"Video fetched",videoView})
        }
        else{
          res.status(201).json({msg:"",videoView})
        }
         
       }
       else{
        res.status(404).json({msg:"Error"})
       }
     
})
routes.post("/category-video",upload.none(),async(req,res)=>{
      const category=await videoModel.find({category:req.body.category}).populate("user_id")
       if(category.length>=1){
        res.status(200).json({msg:"success",category})
       }
       else{
        res.status(400).json({msg:"OPPS"})
       }
})
module.exports=routes;