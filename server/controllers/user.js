const User = require("../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/user");
async function handleUserSignup(req, res) {
  const { username, email, password } = req.body;
  if (!username) {
    return res.status(400).json({
      status: "error",
      msg: "username required",
    });
  }
  if (!email) {
    return res.status(400).json({
      status: "error",
      msg: "email id required",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: "error",
      msg: "password required",
    });
  }
  try {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      status: "ok",
      result: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        msg: "username or email already exits",
      });
    }
    return res.status(400).json({
      status: "error",
      msg: "user not created ",
    });
  }
}
async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({
      status: "error",
      msg: "username required",
    });
  }
  if (!password) {
    return res.status(400).json({
      status : "error",
      msg: "password required",
    });
  }
  try {
    const isPresent = await User.findOne({ username });

    if (!isPresent) {
      return res.status(400).json({
        status: "error",
        msg: "user not registerd",
      });
    } else {
      
      const user =await bcrypt.compare(password,isPresent?.password);
      
      if (!user) {
        return res.status(400).json({
          status: "error",
          msg: "password incorrect",
        });
      }
      const token =setUser(isPresent);
      return res.status(200).json({
        status: "true",
        jwt:token,
      });
    }
    
  } catch (error) {
  
  }
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
