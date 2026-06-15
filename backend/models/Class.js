const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },

  subjects: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);