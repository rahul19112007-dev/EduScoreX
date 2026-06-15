const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    class: String,
    subjects: [
        {
            name: String,
            marks: Number
        }
    ],

totalMarks: {
  type: Number,
  default: 0
},

percentage: {
  type: Number,
  default: 0
},

attendance: [
  {
    date: Date,
    status: {
      type: String,
      enum: ["Present", "Absent"],
    },
  },
],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Student", studentSchema);