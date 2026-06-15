const express = require("express");
const router = express.Router();

const ActivityLog = require(
  "../models/ActivityLog"
);

const protect = require(
  "../middleware/authMiddleware"
);

const {
  teacherOrAdmin,
} = require(
  "../middleware/roleMiddleware"
);

router.get(
  "/",
  protect,
  teacherOrAdmin,
  async (req, res) => {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 });

    res.json(logs);
  }
);

module.exports = router;