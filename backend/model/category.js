
const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    category:{
        type:String
    },
    categoryId:{
    type:mongoose.Schema.ObjectId,
     ref:"userTable"
    },
    urlId:{
        type:String
    },
    timestamps:{
        type:Date,
        default:Date.now()
    }

})
const categoryModel=mongoose.model("categories",categorySchema)
module.exports=categoryModel