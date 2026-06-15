const mongoose = require("mongoose");

const activityLogSchema =
  new mongoose.Schema(
    {
      userName: String,
      role: String,
      action: String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "ActivityLog",
    activityLogSchema
  );