const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id, user.name);
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error. Contact an administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  const errorLoginMessage = { ok: false, msg: "Check your user and password" };
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json(errorLoginMessage);
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(400).json(errorLoginMessage);
    const token = await generateJWT(user.id, user.name);
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error. Contact an administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  res.status(200).json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
