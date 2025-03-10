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
connectionString("mongodb+srv://sameerdas6143:S6EfR71P3I2MPGlt@mern-cluster.4hg4u.mongodb.net/react-videohub?retryWrites=true&w=majority&appName=mern-cluster")

//midlleware
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())
app.use(cors(
    {
        origin:"https://videohub-1-szeq.onrender.com",
        credentials:true,
       
    }
))
app.use(express.static("upload"))


// routes
app.use("/",routes)
app.use("/videos",videoRoutes)


app.listen(PORT,()=>console.log("server started "))