import { generateTokenAndSaveCookies } from "../lib/utils/generateTokenAndSaveCookies.js";
import User from "../models/user.model.js"
import bcrypt  from 'bcryptjs'

export const signUp = async(req,res)=>{
  try {
    const {fullname,role,username, email, password} = req.body;
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid email format"});
    }

    const existingUsername = await User.findOne({username:username});
    if(password.length < 6){
        return res.status(404).json({error:"password character should be more than six"})
    }


    if(existingUsername){
       return res.status(404).json({error:"User Name is already taken"})
    }

  const existingEmail = await User.findOne({email});
     if(existingEmail){
        return res.status(404).json({error:"Email already taken"})
    };

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
    username:username,
    fullname:fullname,
    email:email,
    role:role,
    password:hashedPassword
})


if(newUser){
    generateTokenAndSaveCookies(newUser._id, newUser.role,res);
    await newUser.save();


    res.status(201).json({
        _id:newUser._id,
        username:newUser.username,
        fullname:newUser.fullname,
        email:newUser.email,
        role:newUser.role

    });
} else{
    res.status(404).json({error:'Invalid data'})
}

  } catch (error) {
    console.log('error in signup',error.message);
    res.status(500).json({error:"server error"})
  }
}
export const signIn = async(req,res)=>{
   try{
    const {username,password} = req.body;
    const user = await User.findOne({username});

    const isPasswordValid = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordValid){
        return res.status(400).json({error:'invalid username or password'});
    }
    const token =  generateTokenAndSaveCookies(user._id,user.role,res);
    // res.status(201).json({
    //     _id:user._id,
    //     fullName:user.fullname,
    //     username:user.username,
    //     email:user.email,
    //     role:user.role
    // });

    res.status(201).json({token});

   }catch (error) {
    console.log('error in signin',error.message);
    res.status(500).json({error:"Iternal server error"})
  }
}

export const signOut = async(req,res)=>{
   try {
     res.cookie('jwt','',{maxAge:0}),
    res.status(201).json({message:"loged out successfully"})
   } catch (error) {
    console.log('error in signout',error.message);
    res.status(500).json({error:'Server Error'})
   }
}
export const getMe = async(req,res)=>{
   try {
    const user = await User.findById(req.user.usedId).select('-password');
    console.log(user);
    if(!user){
      return res.status(404).json({error:"User not found"})
    }
    res.status(201).json(user)
   } catch (error) {
    console.log('error in getMe controller',error.message);
    res.status(500).json({error:'Internal Server Error'})
   }
}