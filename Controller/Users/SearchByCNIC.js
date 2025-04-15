import sendResponse from "../../Helper/SendResponse.js";
import UserModel from "../../Modules/UserSchema.js";


export const SearchByCNIC = async (req, res) => {
    try {
      const { cnin } = req.params;
      const specificUser = await UserModel.findOne({ cnin }).select("-password"); // Exclude password
  
      if (!specificUser) {
        return sendResponse(res, 404, null, true, "User not found");
      }
  
      sendResponse(res, 200, specificUser, false, "Fetched Data Successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  }