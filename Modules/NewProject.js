
import mongoose from "mongoose";

const newProjectSchema = new mongoose.Schema(
  {
    projectTitle: { type: String, required: true },
    projectType: { type: String, required: true },
    projectID: { type: String,  },
    client: { type: String, required: true },
    contactNo: { type: String, required: true }, 
    email: { type: String, default: null }, 
    onboarding: { type: Date, required: true },
    salesPerson: { type: String, required: true },
    salesPersonID:{type:String},  
    status: { type: String, required: true, enum: ["In Progress", "Completed", "Pending"] }, // Fixed "Completed"
    link: { type: String, default: null }, 
    proposedCompletionDate: { type: Date, default: null },
    actualCompletionDate: { type: Date, default: null },
    region: { type: String, required: true }, 
    assignto: { type: String, default: "Not Assigned" },
    assignedDate: { type: Date, default: null },
    projectCost: { type: String, default: null }, 

  },
  {
    timestamps: true, }
);

const ProjectsModel = mongoose.models.Projects || mongoose.model("Projects", newProjectSchema);
export default ProjectsModel;
