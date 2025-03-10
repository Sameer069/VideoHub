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
        default:"https://res.cloudinary.com/dzmrkbev5/image/upload/v1741630343/%5Bobject%20Object%5D/93039741e042c42035ea22e2.jpg"
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