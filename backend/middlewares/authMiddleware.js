const userModel=require("../models/user.models");
const jwt=require("jsonwebtoken");
module.exports.authMiddleware=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    const {id}=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findById(id);
    if(!user){
        return res.status(401).json({
            success:false,
            message:"user not found"    
        })
    }
    req.user=user;
    next();
}