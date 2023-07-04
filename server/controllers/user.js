const User = require("../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/user");
async function handleUserSignup(req, res) {
  const { username, email, password } = req.body;
  if (!username) {
    return res.status(400).json({
      success: "false",
      msg: "username required",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: "false",
      msg: "email id required",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: "false",
      msg: "password required",
    });
  }
  try {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      success: "true",
      result: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: "false",
        msg: "username or email already exits",
        result: error,
      });
    }
    return res.status(400).json({
      success: "false",
      msg: "user not created ",
      result: error,
    });
  }
}
async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({
      success: "false",
      msg: "username required",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: "false",
      msg: "password required",
    });
  }
  try {
    const isPresent = await User.findOne({ username });

    if (!isPresent) {
      return res.status(400).json({
        success: "false",
        msg: "user not registerd",
      });
    } else {
      
      const user =await bcrypt.compare(password,isPresent?.password);
      
      if (!user) {
        return res.status(400).json({
          success: "false",
          msg: "password in correct",
        });
      }
      const token =setUser(isPresent);
      res.setHeader('Set-Cookie', 'myCookie=cookieValue; SameSite=None; Secure');
      return res.status(200).json({
        success: "true",
        jwt:token
      });
    }
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
