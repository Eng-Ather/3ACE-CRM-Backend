import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    userId:{type:String, required:true, unique:true},
    position:{type:String, required:true},
    cnin: { type: String, required: true, unique: true },
    phoneNumber: { type: [String], required: true }, 
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
