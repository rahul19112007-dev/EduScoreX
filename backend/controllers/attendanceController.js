const Attendance = require("../models/Attendance");

// Mark Attendance
exports.markAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.create(req.body);

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Attendance
exports.getAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.find()
        .populate("studentId");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};