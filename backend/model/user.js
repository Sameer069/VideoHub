const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:"default.jpg"
    },
    post_video:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"videosTable"
        }
    ],
    timestamp:{type:Date,default:Date.now()}
})

const userModel=mongoose.model("userTable",userSchema)
module.exports=userModel