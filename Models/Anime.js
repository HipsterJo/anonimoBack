import mongoose from "mongoose";
import Genre from "./Genre.js"


const Anime = new mongoose.Schema({
  name: { type: String, required: true },
  imageCard: { type: String, required: true },
  discriptionFull: { type: String, required: true },
  src: { type: String, required: true },
  lastEpisode: { type: Number, required: true },
  rating: { type: Number, required: true },
  imageHuge: { type: String, required: true },
  discriptionBriefly: { type: String, required: true },
  dataRealese: { type: Number, required: true },
  dataPublish: { type: Number, required: true },
  genre: [{
    type: String,
    required: true 
  }]
  
});


export default mongoose.model("Anime", Anime);
