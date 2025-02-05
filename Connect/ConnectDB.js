import mongoose from "mongoose";
import "dotenv/config";

// Destructure the environment variables
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@smit.9zo1a.mongodb.net/${DB_NAME}&appName=smit`;

mongoose.connect(url);

export default mongoose;
