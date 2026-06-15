const Class = require("../models/Class");

// Create Class
exports.createClass = async (req, res) => {
  const newClass = await Class.create(req.body);
  res.json(newClass);
};

// Get All Classes
exports.getClasses = async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
};
// Update Class
exports.updateClass = async (req, res) => {
  const updatedClass =
    await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedClass);
};

// Delete Class
exports.deleteClass = async (req, res) => {
  await Class.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Class Deleted"
  });
};