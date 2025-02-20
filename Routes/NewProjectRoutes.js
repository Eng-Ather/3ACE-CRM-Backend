import express from "express";
import ProjectsModel from '../Modules/NewProject.js'
import sendResponse from '../Helper/SendResponse.js'

const projectRouter = express.Router()

// API to addNew Project
projectRouter.post ('/newproject', async (req, res)=>{
    try{

        const {projectTitle,projectType,projectID, client,contactNo, email, onboarding,
            salesPerson, status, link, proposedCompletionDate, actualCompletionDate,
            region, developer, projectCost
        } = req.body

        // checking if project ID already exists
        const projectIDexist = await ProjectsModel.findOne({projectID})
        if(projectIDexist){
          return sendResponse(res, 400, null, true, "Project ID already exists")}

        const newProject = new ProjectsModel ({projectTitle,projectType, projectID, client,contactNo,
           email, projectCost, onboarding, salesPerson, status, link, proposedCompletionDate,
           actualCompletionDate, region, developer, projectCost
        } )

        await newProject.save()
        sendResponse(res, 201, newProject, false, "Project Added successfully");
        
    }

    catch(error){
        sendResponse(res, 500, null, true, error.message)
        return
    }
})

// API to get ALL project Details
projectRouter.get("/allproject", async (req, res)=>{
    try{
    const allProject = await ProjectsModel.find()
    sendResponse(res, 200, allProject, false, "Fetched Data Successfully")
    }
    catch (error) {
        sendResponse(res, 500, null, true, error.message);
      }
})

// edit project details API
projectRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProject = await ProjectsModel.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedProject) {
        return sendResponse(res, 404, null, true, "Project not found");
      }
  
      sendResponse(res, 200, updatedProject, false, "Project details updated successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
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
    const specificProject = await ProjectsModel.findById(id);
    if (!specificProject) {
      return sendResponse(res, 404, null, true, "Project not found");
    }
    return sendResponse(res, 200, specificProject, false, "Project fetched successfully");
  } catch (error) {
    return sendResponse(res, 500, null, true, error.message);
  }
});



export default projectRouter