const ActivityLog = require(
  "../models/ActivityLog"
);

const logActivity = async (
  userName,
  role,
  action
) => {
  try {
    await ActivityLog.create({
      userName,
      role,
      action,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logActivity;