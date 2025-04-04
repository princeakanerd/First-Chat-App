import User from "../models/user.model.js"
export const signup = async (req , res)=> {
    const{fullname , email , password} = req.body; 
    try {
       if(password.length < 6) {
        return res.status(400).json({message: "Password must be atleast 5 characters"}) ;
       }
       const user = await User.findOne({email}) ;
       if(user) return res.status(400).jsonn({message : "Email already exists"}) ;
       
       const salt = await bc 
        
    } catch (error) {
        
    }
}
export const login = (req , res)=> {
    res.send("login route")
}
export const logout = (req , res)=> {
    res.send("logout route")
}