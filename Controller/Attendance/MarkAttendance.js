import sendResponse from "../../Helper/SendResponse.js";
import Attendance from "../../Modules/Attendance.js";

export default async function MarkAttendance(req, res) {
  try {
    const { user, uid, time, scannedData } = req.body;
    const newEntry = await Attendance.create({ user, uid, time, scannedData });
    sendResponse(res, 201, newEntry, false, "Attendance marked successfully");
  } catch (err) {
    sendResponse(
      res,
      500,
      null,
      true,
      "Error Marking Attendance" + err.message
    );
  }
}
