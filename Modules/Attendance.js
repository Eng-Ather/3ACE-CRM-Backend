import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  user: String,
  uid: String,
  time: Date,
  scannedData: String,
});

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
