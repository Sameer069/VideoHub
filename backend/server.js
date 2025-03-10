require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express")
const {connectionString}=require("./db")
const app=express()
const cors=require("cors")
const routes=require("./routes/userRoutes")
const videoRoutes=require("./routes/adminRoutes")
const cookieParser=require("cookie-parser")
const path=require("path") 
const PORT=process.env.PORT||3003
connectionString(process.env.MONGO_URL)

//midlleware
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())
app.use(cors(
    {
        origin:['http://localhost:3001', 'http://127.0.0.1:3001'],
        credentials:true,
       
    }
))
app.use(express.static("upload"))


// routes
app.use("/",routes)
app.use("/videos",videoRoutes)


app.listen(PORT,()=>console.log("server started at 3003"))