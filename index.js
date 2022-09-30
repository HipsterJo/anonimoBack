import router from "./Routes/routes.js";
import authRouter from "./Routes/routeAuth.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"
import env from "dotenv"
import handleErrors from "./middleware/errors-middleware.js"


env.config()
const PORT =  5000;
const DB_URL =
  "mongodb+srv://HipsterJo:waq10wujA2V3lctQ@cluster0.uusgdri.mongodb.net/?retryWrites=true&w=majority";
const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
))
app.use(express.static("static"));
app.use("/api", router);
app.use("/auth", authRouter)
app.use(handleErrors)

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log("Server has been started on ", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
