const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// REGISTER
exports.register = async (req, res) => {
    const {
  name,
  email,
  password,
  role,
  studentId,
} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
  studentId,
});

    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  studentId: user.studentId,
  token: generateToken(
  user._id,
  user.role
),
});
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
    _id: user._id,
    name: user.name,
    role: user.role,
    studentId: user.studentId,
    token: generateToken(user._id, user.role)
});
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });

    console.log(user);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const match = await bcrypt.compare(
      password,
      user.password
    );

    console.log(match);

    if (!match)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      studentId: user.studentId,
      token: generateToken(
        user._id,
        user.role
      ),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};