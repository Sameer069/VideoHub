const jwt=require("jsonwebtoken")
function isuserLoggedin(req,res,next){
    const token=  req.headers.authorization.split(" ")[1]
    
     if(token){
        jwt.verify(token,"sam@12",(err,decode)=>{
          if(err) return res.status(404).json({msg:"Invalid token"})
            req.user=decode
             next()
        })
       
     }
     else{
        res.status(401).json({Erorr:"Unauthorized access"})
     }
    
    
}
module.exports={isuserLoggedin}