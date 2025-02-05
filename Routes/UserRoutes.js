import express from "express";
import UserModel from "../Modules/UserSchema.js"; // Ensure the correct path
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import sendResponse from "../Helper/SendResponse.js"; // Ensure correct path

const userRouter = express.Router();

// API to create an account
userRouter.post("/signup", async (req, res) => {
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
    });

    await newUser.save();
    sendResponse(res, 201, newUser, false, "Account created successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

// API for login
// userRouter("login", async (req, res) => {
//   try {
//     const { email: currentUserEmail, password: currentUserPassword } = req.body;

//     if (!currentUserEmail || !currentUserPassword) {
//       sendResponse(
//         res,
//         500,
//         null,
//         true,
//         "Both Email and password are required"
//       );
//       return;
//     }

//     const user = await UserModel.findOne({ email: currentUserEmail }).lean();
//     if (!user) {
//       sendResponse(res, 404, null, true, "User not found");
//       return;
//     }
//     // Compare the provided password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(
//       currentUserPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       sendResponse(res, 401, null, true, "Invalid password");
//       return;
//     }
//     // Generating token
//     var token = jwt.sign(user, process.env.JWT_SECRET);
//     // console.log(token);

//     sendResponse(res, 200, res, { user, token }, "User login successfully");
//     return

//   } catch (error) {
//     sendResponse(res, 500, null, true, error.message);
//   }
// });

userRouter.post("/login", async (req, res) => {
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
        name : user.name,
        email: user.email,
        role: user.role,
        userId: user.userId,
        position: user.position,
        cnin: user.cnin,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      process.env.JWT_SECRET
    );

    const info = {
      id: user._id,
      name : user.name,
      email: user.email,
      role: user.role,
      userId: user.userId,
      position: user.position,
      cnin: user.cnin,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };

    // Send success response
    sendResponse(res, 200, { info, token }, false, "User login successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

// API to Get All User INfo
userRouter.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await UserModel.find().select("-password");
    sendResponse(res, 200, allUsers, false, "Fetched Data Successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
});

// API to get a single user by ID
// userRouter.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const specificUser = await UserModel.findById(id).select("-password"); // Exclude password field

//     if (!specificUser) {
//       sendResponse(res, 404, null, true, "User not found");
//       return;
//     }
//     sendResponse(res, 200, specificUser, false, "Fetched Data Successfully");
//   } catch (error) {
//     sendResponse(res, 500, null, true, error.message);
//   }
// });

// API to get a single user by cnic
userRouter.get("/:cnin", async (req, res) => {
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
});

export default userRouter;
