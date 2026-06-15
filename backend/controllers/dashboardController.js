const Student = require("../models/Student");
const User = require("../models/User");
const Class = require("../models/Class");

// ADMIN DASHBOARD
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalStudents =
      await Student.countDocuments();

    const totalTeachers =
      await User.countDocuments({
        role: "teacher",
      });

    const totalClasses =
      await Class.countDocuments();

    const students =
      await Student.find();

    const averagePercentage =
      students.length > 0
        ? (
            students.reduce(
              (sum, student) =>
                sum +
                (student.percentage || 0),
              0
            ) / students.length
          ).toFixed(2)
        : 0;

    const topPerformer =
      await Student.findOne().sort({
        percentage: -1,
      });

    res.json({
      totalStudents,
      totalTeachers,
      totalClasses,
      averagePercentage,
      students,
      topPerformer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TEACHER DASHBOARD
exports.getTeacherDashboard =
  async (req, res) => {
    try {
      const totalStudents =
        await Student.countDocuments();

      const students =
        await Student.find();

      const averagePercentage =
        students.length > 0
          ? (
              students.reduce(
                (sum, student) =>
                  sum +
                  (student.percentage || 0),
                0
              ) / students.length
            ).toFixed(2)
          : 0;

      res.json({
        totalStudents,
        averagePercentage,
        students,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// STUDENT DASHBOARD
exports.getStudentDashboard =
  async (req, res) => {
    try {
      const student =
        await Student.findById(
          req.user.studentId
        );

      if (!student) {
        return res.status(404).json({
          message:
            "Student not found",
        });
      }

      const students =
        await Student.find().sort({
          percentage: -1,
        });

      const rank =
        students.findIndex(
          (s) =>
            s._id.toString() ===
            student._id.toString()
        ) + 1;

      res.json({
        ...student.toObject(),
        rank,
        totalStudents:
          students.length,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };