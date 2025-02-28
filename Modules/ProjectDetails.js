import mongoose from "mongoose";

const projectDetailSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    projectID: { type: String, required: true },
    projecTitle: { type: String, required: true },
    remarks: { type: String, required: true }, // Changed to lowercase
    codeLinks: { type: String },
    deploymnetLink: { type: String },
    refrenceLink: { type: String },
    document: { type: String },
  },
  { timestamps: true }
);

const ProjectDetailModel =
  mongoose.models.ProjectDetail ||
  mongoose.model("ProjectDetail", projectDetailSchema);

export default ProjectDetailModel;

// --------------------------------------------------------------
// import cloudinary from "cloudinary";

// // Cloudinary Config
// cloudinary.config({
//   cloud_name: "YOUR_CLOUD_NAME",
//   api_key: "YOUR_API_KEY",
//   api_secret: "YOUR_API_SECRET",
// });

// const uploadFile = async (filePath) => {
//   const result = await cloudinary.uploader.upload(filePath);
//   console.log("File URL:", result.secure_url);
//   return result.secure_url; // ✅ Store this URL in MongoDB
// };
