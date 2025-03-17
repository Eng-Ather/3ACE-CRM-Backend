import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import {
  AddProjectDetails,
  getProjectDetails,
} from "../Controller/ProjectDetails.js";

dotenv.config();

const projectDetailsRouter = express.Router();

projectDetailsRouter.post("/addDetails", AddProjectDetails);

projectDetailsRouter.post("/projectID", getProjectDetails);

export default projectDetailsRouter;
