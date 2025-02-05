import express from "express";
import mongoose from "./Connect/ConnectDB.js";
import 'dotenv/config'
import userRouter from "./Routes/UserRoutes.js";

const app = express();
const port = 4000;


// for mongo db connection
mongoose.connection.on("error", (err) => {
  console.log("Error in connection", err);
});

mongoose.connection.on("open", () => {
  console.log("MongoDB is connected successfully");
});



// main page message
app.get("/", (req, res) => {
    res.send("Welcom TO 3ACE TECHNOLOGIES");
});

app.use(express.json()); // This will allow us to handle JSON bodies

app.use("/user", userRouter)

app.listen(port, () => {
  console.log("server is running on port : ", port);
});

