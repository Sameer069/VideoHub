const mongoose =require("mongoose")
const videoSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"userTable"
    },
    title:{
        type:String,
    },
    url:{
        type:String,
        required:true
    },
    thumbnail:{
      type:String,
      default:"default.jpg"
    },
    category:{
       type:String

    },
    description:{
        type:String
    },
    comments:[],
    like:[{
      type:mongoose.Schema.ObjectId,
     ref:"userTable"
    }],
    views:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"userTable"
        }
    ],
    post_date:{
        type:Date,
        default:Date.now()
    }
})

const videoModel=mongoose.model("videosTable",videoSchema)
module.exports=videoModel