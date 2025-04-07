import express from "express";
import ProjectsModel from "../Modules/NewProject.js";
import sendResponse from "../Helper/SendResponse.js";

const projectRouter = express.Router();

// API to addNew Project
projectRouter.post("/newproject", async (req, res) => {
  try {
    const {
      projectTitle,
      projectType,
      projectID,
      client,
      contactNo,
      email,
      onboarding,
      salesPerson,
      salesPersonID,
      status,
      link,
      proposedCompletionDate,
      actualCompletionDate,
      region,
      assignto,
      assignedDate,
      projectCost,
    } = req.body;

    // checking if project ID already exists
    const projectIDexist = await ProjectsModel.findOne({ projectID });
    if (projectIDexist) {
      return sendResponse(res, 400, null, true, "Project ID already exists");
    }

    const newProject = new ProjectsModel({
      projectTitle,
      projectType,
      projectID,
      client,
      contactNo,
      email,
      projectCost,
      onboarding,
      salesPerson,
      salesPersonID,
      status,
      link,
      proposedCompletionDate,
      actualCompletionDate,
      region,
      assignto,
      assignedDate,
      projectCost,
    });

    await newProject.save();
    sendResponse(res, 201, newProject, false, "Project Added successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
    return;
  }
});

// API to get ALL project Details
projectRouter.get("/allproject", async (req, res) => {
  try {
    const allProject = await ProjectsModel.find();
    sendResponse(res, 200, allProject, false, "Fetched Data Successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

// edit project details API
projectRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { assignto } = req.body

    let updateFields = { ...req.body }

    if (assignto !== "Not Assigned" ) {
      updateFields.assignedDate = new Date()
    }

    const updatedProject = await ProjectsModel.findByIdAndUpdate(id, updateFields, { new: true })

    sendResponse(res, 200, updatedProject, false, "Project details updated successfully")
  } catch (error) {
    sendResponse(res, 500, null, true, error.message)
  }
});

// API to delete Project
projectRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectsModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return sendResponse(res, 404, null, true, "Project not found");
    }

    sendResponse(res, 200, null, false, "Project deleted successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

// specific project API
projectRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const specificProject = await ProjectsModel.findById(id);
    if (!specificProject) {
      return sendResponse(res, 404, null, true, "Project not found");
    }
    return sendResponse(
      res,
      200,
      specificProject,
      false,
      "data fetched successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, true, error.message);
  }
});

// API to get all project of asign developer / designer
projectRouter.post("/assignto", async (req, res) => {
  try {
    const { assignto } = req.body;
    const allproject = await ProjectsModel.find({ assignto });
    if (!allproject) {
      return sendResponse(res, 404, null, true, "No project found");
    }
    sendResponse(res, 200, allproject, false, "Fetched Data");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

export default projectRouter;
