import mongoose from "mongoose";
import "dotenv/config";
// import UserModel from "../Modules/UserSchema";

// Destructure the environment variables
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@smit.9zo1a.mongodb.net/${DB_NAME}?appName=smit`;


// const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@smit.9zo1a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;  // Correct URL format
mongoose.connect(url);

export default mongoose;
