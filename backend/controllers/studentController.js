const Student = require("../models/Student");
const logActivity = require("../utils/logActivity");

// CREATE STUDENT
exports.addStudent = async (req, res) => {
  try {
    const { subjects } = req.body;

    const totalMarks = subjects.reduce(
      (sum, sub) => sum + Number(sub.marks),
      0
    );

    const percentage =
      totalMarks / subjects.length;

    const student = await Student.create({
      ...req.body,
      totalMarks,
      percentage,
    });

    await logActivity(
      req.user.name,
      req.user.role,
      `Added Student ${student.name}`
    );

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL STUDENTS
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE STUDENT
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE STUDENT
exports.deleteStudent = async (req, res) => {
  try {
    const student =
      await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(
      req.params.id
    );

    await logActivity(
      req.user.name,
      req.user.role,
      `Deleted Student ${student.name}`
    );

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET STUDENT REPORT
exports.getStudentReport = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findById(
        req.params.id
      );

const generateRecommendations =
  require("../utils/aiRecommendations");

const recommendations =
  generateRecommendations(student);

res.json({
  ...student.toObject(),
  recommendations,
});

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (
      req.user.role === "student" &&
      req.user.studentId?.toString() !==
        student._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only view your own report",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ATTENDANCE
exports.updateStudent = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      class: className,
      subjects
    } = req.body;

    let totalMarks = 0;
    let percentage = 0;

    if (subjects && subjects.length > 0) {
      totalMarks = subjects.reduce(
        (sum, subject) =>
          sum + Number(subject.marks),
        0
      );

      percentage =
        totalMarks / subjects.length;
    }

    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        {
          name,
          rollNo,
          class: className,
          subjects,
          totalMarks,
          percentage
        },
        {
          new: true
        }
      );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await logActivity(
      req.user.name,
      req.user.role,
      `Updated Student ${student.name}`
    );

    res.json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { date, status } = req.body;

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Fix for old students
    if (!student.attendance) {
      student.attendance = [];
    }

    if (!Array.isArray(student.attendance)) {
  student.attendance = [];
}

student.attendance.push({
  date: new Date(date),
  status,
});

    await student.save();

    res.json({
      message: "Attendance saved",
      student,
    });

  } catch (error) {
    console.log(
      "ATTENDANCE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};