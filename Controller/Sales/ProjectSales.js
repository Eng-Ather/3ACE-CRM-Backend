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
      salesPersonID,
      projectCost,
      paymentDetails,
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
      salesPersonID,
      projectCost,
      paymentDetails,
      projectDeliveryDate,
      status
    });
    await salesRecord.save();
    sendResponse(res, 201, salesRecord, false, "Data Import to Sales Record Successfully");
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

  //to get Individual Project Sales Record
  export const ProjectsSalesRecord =  async (req, res) => {
    try{ 
        const {projectID } = req.body;
        const projectRecord = await ProjectSalesModel.findOne({projectID});

       if(!projectRecord){
            return sendResponse(res, 400, null, true, "No Record Found");
        }
        return sendResponse(res, 200, projectRecord, false, "fetch data Successfully");
    }
    catch (error) {
      return sendResponse(res, 500, null, true, error.message);
    }
  }

  // API to update project of sales Record
  export const EditProjectSalesRecord = async (req, res)=>{

    try {
    const { projectID, updatSalesdData} = req.body;
    const updateRecord = await ProjectSalesModel.findOneAndUpdate(
      { projectID },                // Filter condition
      { $set: updatSalesdData },        // Fields to update
      { new: true }                 // Return updated document
    );
    if(!updateRecord){
      return sendResponse (res, 404, null, true, "User not found");
    }
    sendResponse(res, 200, updateRecord, false, "updates successfully" )
    }
    catch (error){
      return sendResponse(res, 500, null, true, error.message);
    }
    }

  // to delete Project Sales Record
  export const DeleteProjectSalesRecord = async (req, res) => {
    
      try {
        const { projectID } = req.body;
        const deletedSales = await ProjectSalesModel.findOneAndDelete({projectID});
    
        if (!deletedSales) {
          return sendResponse(res, 404, null, true, "Project not found");
        }
    
        sendResponse(res, 200, null, false, "Project deleted successfully");
      } catch (error) {
        sendResponse(res, 500, null, true, error.message);
      }
  }
