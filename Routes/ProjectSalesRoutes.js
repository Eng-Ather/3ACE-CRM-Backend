import express from "express";
import {
  AllProjectsSalesRecord,
  CreateSalesRecord,
  DeleteProjectSalesRecord,
  EditProjectSalesRecord,
} from "../Controller/Sales/ProjectSales.js";
import { ProjectsSalesRecord } from "../Controller/Sales/ProjectSales.js";

import { AddNewPayment } from "../Controller/Sales/AddNewPayment.js";

const projectSalesRouter = express.Router();

projectSalesRouter.post("/salesRecord", CreateSalesRecord);

projectSalesRouter.get("/getSalesRecord", AllProjectsSalesRecord);

projectSalesRouter.post ("/editSalesRecord", EditProjectSalesRecord)

projectSalesRouter.post ("/addNewPayment", AddNewPayment)

projectSalesRouter.post("/getIndivusalSalesRecord", ProjectsSalesRecord);

projectSalesRouter.delete("/deleteSalesRecord", DeleteProjectSalesRecord);

export default projectSalesRouter;
