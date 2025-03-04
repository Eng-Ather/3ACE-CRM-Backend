import express from "express";
import mongoose from "./Connect/ConnectDB.js";
import cors from 'cors'
import 'dotenv/config'
import userRouter from "./Routes/UserRoutes.js";
import projectRouter from "./Routes/NewProjectRoutes.js";
import projectDetrailsRouter from "./Routes/ProjectDetailsRoutes.js";
import projectSalesRouter from "./Routes/ProjectSalesRoutes.js";


const app = express();
// const port = 4000;
const port = process.env.PORT || 4000;  // use process.env.PORT for Vercel


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

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This will allow us to handle JSON bodies

app.use("/user", userRouter)
app.use("/projects", projectRouter )
app.use("/editProjectDetails", projectDetrailsRouter)
app.use("/projectSalesRecord", projectSalesRouter)

app.listen(port, () => {
  console.log("server is running on port : ", port);
});

