import express from "express";
import MarkAttendance from "../Controller/Attendance/MarkAttendance.js";

const attendanceRoutes = express.Router();

attendanceRoutes.post("/markAttendance", MarkAttendance)

export default attendanceRoutes;