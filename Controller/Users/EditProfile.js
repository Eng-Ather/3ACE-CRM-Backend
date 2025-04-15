
import express from "express";
import UserModel from "../../Modules/UserSchema.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import sendResponse from "../../Helper/SendResponse.js";
import verifyToken from "../../Middelwares/TokenVerification.js";

export const EditProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // If password is being updated, hash it first
      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }
      
      const updateUser = await UserModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
      
      if (!updateUser) {
        return sendResponse(res, 404, null, true, "User not found");
      }
      
      sendResponse(res, 200, updateUser, false, "User updated successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  };