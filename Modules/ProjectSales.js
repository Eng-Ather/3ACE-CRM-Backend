import mongoose from "mongoose";

const projectSalesSchema = new mongoose.Schema(
  {
    projectTitle: { type: String, required: true },
    projectType: { type: String, required: true },
    projectID: { type: String, required: true },
    client: { type: String, required: true },
    contactNo: { type: String, required: true },
    email: { type: String, default: null },
    salesPerson: { type: String, required: true },
    salesPersonID:{type:String},
    // assignto: { type: String, default: "Not Assigned" },
    // assignedDate: { type: Date, default: null },
    projectCost: { type: String, default: null },
    
    paymentDetails: {
      type: [
        {
          amount: { type: Number, default:"N/A" },
          date: { type: Date, default:"N/A" },
          purpose: { type: String, default:"N/A" },
        },
      ],
      default: null,
    },

    // onboarding: { type: Date, required: true },
    // actualCompletionDate: { type: Date, default: "Actual Completion Date" },
    projectDeliveryDate: { type: Date, default: "Project Delivery Dtae" },
    status: { type: String, required: true, enum: ["In Progress", "Completed", "Pending"] },

  },
  { timestamps: true }
);

const ProjectSalesModel =
  mongoose.models.projectSalesRecord ||
  mongoose.model("projectSalesRecord", projectSalesSchema);
export default ProjectSalesModel;
