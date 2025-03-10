const mongoose=require("mongoose")


function connectionString(str){
    return mongoose.connect(str).then((succes)=>{
        console.log("Mongodb connected..")
    }).catch(err=>{
        console.log(err)
    })
}
module.exports={connectionString}