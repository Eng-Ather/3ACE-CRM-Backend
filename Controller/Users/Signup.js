import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import UserModel from "../../Modules/UserSchema.js";
import sendResponse from "../../Helper/SendResponse.js";

export const SignUp =  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        userId,
        position,
        cnin,
        phoneNumber,
        address,
        joiningDate
      } = req.body;
  
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return sendResponse(res, 400, null, true, "User already exists");
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        role,
        userId,
        position,
        cnin,
        phoneNumber,
        address,
        joiningDate
      });
  
      await newUser.save();
      sendResponse(res, 201, newUser, false, "Account created successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  };
  