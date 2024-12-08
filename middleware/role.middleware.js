
export const authozieRoles = ( ...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({error:"unauthorized user"})
        };
        next()
    }
}