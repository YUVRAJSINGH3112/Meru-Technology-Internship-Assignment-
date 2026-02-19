const jwt=require("jsonwebtoken");
const userModel=require('../models/user.models');

module.exports.register=async (req,res)=>{
    const {username,email,password}=req.body;
    try {
        const user=await userModel.create({username,email,password});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error.message
        })
    }
}
module.exports.login=async (req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required"
            })
        }
            const user = await userModel.findOne({ email });
            if (!user || user.password !== password) {
                return res.status(401).json({
                success: false,
                message: "Invalid email or password"
                });
            }
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
                token
            });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to login",
            error:error.message
        })
    }
}
module.exports.getProfile=async (req,res)=>{
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user profile",
            error: error.message
        });
    }
}

module.exports.logout=async (req,res)=>{
    try {
        // Assuming you are using JWT for authentication, you can simply clear the token on the client side
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to logout",
            error: error.message
        });
    }
}