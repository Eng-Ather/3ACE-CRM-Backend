import express from "express";
import sendResponse from "../Helper/SendResponse.js";
import ProjectSalesModel from "../Modules/ProjectSales.js";
import { AllProjectsSalesRecord, CreateSalesRecord } from "../Controller/Sales/ProjectSales.js";

const projectSalesRouter = express.Router();

projectSalesRouter.post("/salesRecord", CreateSalesRecord);

projectSalesRouter.get("/getSalesRecord", AllProjectsSalesRecord)


// projectSalesRouter.get("/getSalesRecord", async (re, res) => {
//   try {
//     const allProjectsRecord = await ProjectSalesModel.find();
//     if (!allProjectsRecord) {
//       return sendResponse(res, 400, null, true, "No Record Found");
//     }
//     sendResponse(
//       res,
//       201,
//       allProjectsRecord,
//       "Fetch Sales Record Successfully"
//     );
//   } catch (error) {
//     return sendResponse(res, 500, null, true, error.message);
//   }
// });

export default projectSalesRouter;
