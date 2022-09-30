import mongoose from "mongoose";


const Genre = new mongoose.Schema({
    name: { type: String, 
        required: true
     },
    param:{ type: String, 
        required: true
     }
  });

export default mongoose.model("Genre", Genre);