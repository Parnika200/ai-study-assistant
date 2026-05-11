import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:String,
    email:{type: String, unique:true},
    password:String
}, { timestamps: true })

export default mongoose.model("User",UserSchema)