
import sendResponse from "../../Helper/SendResponse.js";
import ProjectSalesModel from "../../Modules/ProjectSales.js";

export const AddNewPayment = async (req, res) => {
  try {
    const { projectID, newPayment } = req.body; // Get all fields from request body
    const { amount, date, purpose} = newPayment

    // Validate required fields
    if (!projectID) {
      return sendResponse(res, 400, null, true, "Project ID is required");
      console.log("Project not found");
    }
    console.log("projectID : ", projectID);
    

    const updateRecord =  await ProjectSalesModel.findOneAndUpdate(
      { projectID },                              //searching project
      { $push: { paymentDetails: newPayment } }, // Add to array
      { new: true }                              //this returns the updated document
    );

    if (!updateRecord) {
      return sendResponse(res, 404, null, true, "Project not found");
    }

    sendResponse(res, 200, updateRecord, false, "Payment added successfully");
    console.log("Payment added successfully");

  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
};