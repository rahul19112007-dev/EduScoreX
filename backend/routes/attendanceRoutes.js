const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  teacherOrAdmin,
} = require(
  "../middleware/roleMiddleware"
);

const {
  markAttendance,
  getAttendance,
} = require(
  "../controllers/attendanceController"
);

router.post(
  "/",
  protect,
  teacherOrAdmin,
  markAttendance
);

router.get(
  "/",
  protect,
  getAttendance
);

module.exports = router;