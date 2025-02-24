// import mongoose from "mongoose";
// import express from "express";
// import dotenv from "dotenv";    
// import sendResponse from "../Helper/SendResponse.js";
// import ProjectDetailModel from "../Modules/ProjectDetails.js";

// dotenv.config();

// const projectDetrailsRouter = express.Router();


// projectDetrailsRouter.post("/addDetails", async (req, res)=>{

//     try{
//         // const{id} = req.params
//         const {userID, projectID, remarks, codeLinks, deploymnetLink ,refrenceLink, document} = req.body

//         if(!userID || !projectID){
//             return sendResponse(res, 400, null, fals, "both project id and user id are repuired")
//         }

//        const AddDetail =new  ProjectDetailModel({userID, projectID, remarks, codeLinks, deploymnetLink ,refrenceLink, document})
//         AddDetail.save()
//         sendResponse(res, 201, AddDetail, false, "Details Added successfully")
//     }
//     catch(error){
//         sendResponse(res, 500, null, true, error.message)
//         return
//     }
// })

// export default projectDetrailsRouter
// ----------------------------

import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";    
import sendResponse from "../Helper/SendResponse.js";
import ProjectDetailModel from "../Modules/ProjectDetails.js";

dotenv.config();

const projectDetailsRouter = express.Router();

projectDetailsRouter.post("/addDetails", async (req, res) => {
    try {
        const { userID, projectID, remarks, codeLinks, deploymnetLink, refrenceLink, document } = req.body;

        if (!userID || !projectID) {
            return sendResponse(res, 400, null, false, "Both project ID and user ID are required");
        }

        const addDetail = new ProjectDetailModel({
            userID,
            projectID,
            remarks,
            codeLinks,
            deploymnetLink,
            refrenceLink,
            document
        });

        await addDetail.save(); 

        sendResponse(res, 201, addDetail, false, "Details added successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, error.message);
    }
});

export default projectDetailsRouter;
