
import jwt from "jsonwebtoken";
import sendResponse from "../Helper/SendResponse.js";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return sendResponse(res, 401, null, true, "Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded; // Attach decoded user to request object
    console.log(req.user);

    // If role-based authentication is needed
    // if (decoded.role !== "admin") {
    //   return sendResponse(res, 403, null, true, "Access denied. Admins only.");
    // }

    next(); // Move to next middleware if token is valid
  } catch (error) {
    return sendResponse(res, 401, null, true, error.message || "Invalid or expired token");
  }
};

export default verifyToken;