import express from "express";
import UserModel from "../Modules/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import sendResponse from "../Helper/SendResponse.js"; 
import verifyToken from "../Middelwares/TokenVerification.js";
import { EditProfile } from "../Controller/Users/EditProfile.js";
import { SignUp } from "../Controller/Users/Signup.js";
import { Signin } from "../Controller/Users/Signin.js";
import { SearchByCNIC } from "../Controller/Users/SearchByCNIC.js";

const userRouter = express.Router();


userRouter.post("/signup", SignUp)        //Signup API


userRouter.post("/signin", Signin)        //Signin API

// Route to get current user info
userRouter.get("/currentUserInfo", verifyToken, async (req, res) => {
  try {
    // const currentUser = await UserModel.findById(req.user._id).select("-password");

    const currentUser = await UserModel.findById(req.user.id);
    console.log(currentUser);
    console.log(currentUser);
    console.log("Current User from DB:", currentUser);

    if (!currentUser) {
      return sendResponse(res, 404, null, true, "User not found in database");
    }

    sendResponse(res, 200, currentUser, false, "Fetched Data Successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "xxxxxxxxxxxxxx");
  }
});

// API to Get All User INfo
userRouter.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await UserModel.find().select("-password");
    sendResponse(res, 200, allUsers, false, "Fetched Data Successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "error.message");
  }
});


userRouter.put("/:id", EditProfile);          //Edit Profile API


userRouter.get("/:cnin", SearchByCNIC)        //Seacrch user through CNIC

export default userRouter;
