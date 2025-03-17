import sendResponse from "../Helper/SendResponse.js";
import ProjectDetailModel from "../Modules/ProjectDetails.js";


export const getProjectDetails = async (req, res) => {
  
    try {
      const { projectID } = req.body;
      const getProjectDetails = await ProjectDetailModel.find({ projectID });
  
      if (!getProjectDetails.length) {
        return sendResponse(res, 400, null, true, "No Record Found");
      }
      sendResponse(
        res,
        201,
        getProjectDetails,
        false,
        "Fetch Project Details Successfully"
      );
    } catch (error) {
      return sendResponse(res, 400, null, true, error.message);
    }
  };

  export const AddProjectDetails = async (req, res) => {
    try {
      const {
        userID,
        projectID,
        userName,
        userRole,
        projecTitle,
        remarks,
        codeLinks,
        deploymnetLink,
        refrenceLink,
        document,
      } = req.body;
  
      if (!userID || !projectID) {
        return sendResponse(
          res,
          400,
          null,
          false,
          "Both project ID and user ID are required"
        );
      }
  
      const addDetail = new ProjectDetailModel({
        userID,
        projectID,
        userName,
        userRole,
        projecTitle,
        remarks,
        codeLinks,
        deploymnetLink,
        refrenceLink,
        document,
      });
  
      await addDetail.save();
  
      sendResponse(res, 201, addDetail, false, "Details added successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  };