//Iska specific purpose hi wo protect route banana tha

import jwt from "jsonwebtoken"
//We want to validate the token hence we have added this import
import User from "../models/user.model.js"
// Auth is related to the user so

export const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt 
        //idhar jwt isiliye kyunki utils.js mein usko maine ye naam dia tha
        if(!token) {
            return res.status(401).json({message : "No Tokens provided bro"}) ;
        }
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        if(!decoded){
            return res.status(401).json({message : "Unauthorised , Invalid token "}) ;
        }

        const user = await User.findById(decoded.userId).select("-password") ;
        if(!user){
            return res.status(404).json({message :"user not found"}) ;
        }

        req.user = user ;
        next()

    } catch (error) {
        console.log("Some errorrr" , error.message) ;
        res.status(500).json({message : "ProtectRoute Error"}) ;
    }
}