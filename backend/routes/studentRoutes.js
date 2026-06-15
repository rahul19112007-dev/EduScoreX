const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentReport,
  markAttendance,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const {
  adminOnly,
  teacherOrAdmin,
} = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  teacherOrAdmin,
  addStudent
);

router.get(
  "/",
  protect,
  getStudents
);

router.get(
  "/report/:id",
  protect,
  getStudentReport
);

router.post(
  "/attendance/:id",
  protect,
  teacherOrAdmin,
  markAttendance
);

router.get(
  "/:id",
  protect,
  getStudentById
);

router.put(
  "/:id",
  protect,
  teacherOrAdmin,
  updateStudent
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteStudent
);

module.exports = router;