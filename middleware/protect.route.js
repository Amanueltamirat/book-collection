import jwt from "jsonwebtoken";
import User from '../models/user.model.js'

const protectRoute = async(req,res,next)=>{
       let authHeader = req.headers || req.headers.authorization || req.headers.Authorization || req.headers.authorization.startsWith('Bearer')
       let token;

        if(authHeader){
        token = authHeader.authorization.split(' ')[1];
    };


    if(!token){
        return res.status(404).json({error:"unauthorized user"})
    }

 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        return res.status(404).json({error:'unauthorized:invalid token'})
    }
    
    req.user = decoded;
    next()

 } catch (error) {
    console.log('Error in protect route',error.message);
    res.status(500).json({error:"Internal server Error in protect route"})
 }
}

export default protectRoute