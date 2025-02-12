import express from "express";
import ProjectsModel from '../Modules/NewProject.js'
import sendResponse from '../Helper/SendResponse.js'

const projectRouter = express.Router()

// API to addNew Project
projectRouter.post ('/newproject', async (req, res)=>{
    try{

        const {projectTitle,projectType,client,contactNo, email, onboarding,
            salesPerson, status, link, proposedCompletionDate, actualCompletionDate,
            region, developer
        } = req.body

        const newProject = new ProjectsModel ({projectTitle,projectType,client,contactNo, email, onboarding,
            salesPerson, status, link, proposedCompletionDate, actualCompletionDate,
            region, developer
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

// API to get USER DETAILS
projectRouter.get("/specific", async (req, res)=>{
    try{
    // const allProject = await ProjectsModel.find()
    // sendResponse(res, 200, allProject, false, "Fetched Data Successfully")
    }
    catch (error) {
        // sendResponse(res, 500, null, true, error.message);
      }
})


export default projectRouter