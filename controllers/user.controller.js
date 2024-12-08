import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const getUserProfile = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select('-password')
        if(!user){
            return res.status(404).json({error:error.message})
        }
        res.status(201).json(user)
    } catch (error) {
        console.log('error in geting user profile',error.message);
        res.status(500).json({error:error.message})
    }
};

export const updateUserProfile = async(req,res)=>{
    const {fullname,role,username,email,confirmPassword,newPassword} = req.body;
   

    const userId = req.user.usedId;

    try {
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        if((!confirmPassword && newPassword) || (!newPassword && confirmPassword)){
            return res.status(404).json({error:'please provide current and new pasword'})
        }

        if(confirmPassword && newPassword){
            const isMatch = await bcrypt.compare(newPassword,user.password);
     
        if(!isMatch){
            return res.status(404).json({error:"current password is not correct"})
        }
        if(newPassword.length < 6){
            return res.status(404).json({error:'password must be at least six characters'})
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt)
           }
      
    user.fullname = fullname || user.fullname,
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    user = await user.save();

    user.password = null;

    res.status(201).json(user)

    } catch (error) {
        console.log('user updating error',error.message);
        res.status(500).json({error:'Internal server error'})
        }
}