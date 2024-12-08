import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        // minLength:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    role:{
        type:String,
        // required:true,
        enum:["user","admin"],
        default:"user"
    }
},{
    timestamps:true
})


const User = mongoose.model("User", userSchema);
export default User