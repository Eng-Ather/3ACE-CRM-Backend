import express from "express";
import {
  AllProjectsSalesRecord,
  CreateSalesRecord,
  DeleteProjectSalesRecord,
} from "../Controller/Sales/ProjectSales.js";
import { ProjectsSalesRecord } from "../Controller/Sales/ProjectSales.js";

const projectSalesRouter = express.Router();

projectSalesRouter.post("/salesRecord", CreateSalesRecord);

projectSalesRouter.get("/getSalesRecord", AllProjectsSalesRecord);

projectSalesRouter.post("/getIndivusalSalesRecord", ProjectsSalesRecord);

projectSalesRouter.delete("/deleteSalesRecord", DeleteProjectSalesRecord);

export default projectSalesRouter;
