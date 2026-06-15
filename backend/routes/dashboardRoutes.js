const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
getAdminDashboard,
getTeacherDashboard,
getStudentDashboard,
} = require(
"../controllers/dashboardController"
);

router.get(
"/admin",
protect,
getAdminDashboard
);

router.get(
"/teacher",
protect,
getTeacherDashboard
);

router.get(
"/student",
protect,
getStudentDashboard
);

module.exports = router;
