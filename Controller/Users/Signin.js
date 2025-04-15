import UserModel from "../../Modules/UserSchema.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import sendResponse from "../../Helper/SendResponse.js";
// import UserModel from "../../Modules/UserSchema.js";
// import sendResponse from "../../Helper/SendResponse.js";


export const Signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        sendResponse(
          res,
          400,
          null,
          true,
          "Both Email and Password are required"
        );
        return;
      }
  
      // Find user by email
      const user = await UserModel.findOne({ email }).lean();
  
      if (!user) {
        sendResponse(res, 404, null, true, "User not found");
        return;
      }
  
      // Compare password with hashed password in DB
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        sendResponse(res, 401, null, true, "Invalid password");
        return;
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          // name: user.name,
          // email: user.email,
          // role: user.role,
          // userId: user.userId,
        },
        process.env.JWT_SECRET // Token expires in 10 minutes
      );
  
      const info = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user.userId,
        // position: user.position,
        // cnin: user.cnin,
        // phoneNumber: user.phoneNumber,
        // address: user.address,
      };
  
      // Send success response
      sendResponse(res, 200, { info, token }, false, "User login successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  };
  