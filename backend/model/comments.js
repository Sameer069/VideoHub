const mongoose =require("mongoose")

const commentSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"userTable"
    },
    comments:{
        type:String,
    },
    commentProfile:{
   type:String
    },
    user_name:{
    type:String
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }
})

const commentModel=mongoose.model("userComment",commentSchema)
module.exports=commentModel