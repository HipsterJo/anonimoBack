import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
        email:{type: String, unique: true, required: true},
        password:{type: String, required: true},
        isActivated:{type: Boolean, default:false}, 
        activatedLink:{type: String},
        roles:[{type: String, ref: 'Role'}]
        
        
  }); 

export default mongoose.model("User", UserSchema);