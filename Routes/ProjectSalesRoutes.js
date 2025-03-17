import express from "express";
import {
  AllProjectsSalesRecord,
  CreateSalesRecord,
} from "../Controller/Sales/ProjectSales.js";

const projectSalesRouter = express.Router();

projectSalesRouter.post("/salesRecord", CreateSalesRecord);

projectSalesRouter.get("/getSalesRecord", AllProjectsSalesRecord);

export default projectSalesRouter;
