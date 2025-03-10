import sendResponse from "../../Helper/SendResponse.js";
import ProjectSalesModel from "../../Modules/ProjectSales.js";


//to Create Project sales Record
export const CreateSalesRecord =  async (req, res) => {
  try {
    const {
      projectTitle,
      projectType,
      projectID,
      client,
      contactNo,
      email,
      salesPerson,
      assignto,
      assignedDate,
      projectCost,
      paymentDetails,
      onboarding,
      actualCompletionDate,
      projectDeliveryDate,
      status
    } = req.body;

    if (!projectID)
      return sendResponse(res, 400, null, false, "Project id is required");

    // Check if projectRecord already exists
    const existingRecord = await ProjectSalesModel.findOne({ projectID });
    if (existingRecord) {
      return sendResponse(
        res,
        400,
        null,
        true,
        "Project Record already exists"
      );
    }

    const salesRecord = new ProjectSalesModel({
      projectTitle,
      projectType,
      projectID,
      client,
      contactNo,
      email,
      salesPerson,
      assignto,
      assignedDate,
      projectCost,
      paymentDetails,
      onboarding,
      actualCompletionDate,
      projectDeliveryDate,
      status
    });
    await salesRecord.save();
    sendResponse(res, 201, salesRecord, false, "import to sales successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
}

//to get All Project Sales Record
export const AllProjectsSalesRecord =  async (re, res) => {
    try {
      const allProjectsRecord = await ProjectSalesModel.find();
      if (!allProjectsRecord) {
        return sendResponse(res, 400, null, true, "No Record Found");
      }
      sendResponse(
        res,
        201,
        allProjectsRecord,
        false,
        "Fetch Sales Record Successfully"
      );
    } catch (error) {
      return sendResponse(res, 500, null, true, error.message);
    }
  }