const User = require("../models/user");
const { LeetCode } = require("leetcode-query");
const leetcode = new LeetCode();
const { generateFile } = require("../services/generatefile");
const { executeCpp } = require("../services/executeCpp");

async function handleProblem(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      status: "error",
      msg: "enter problem name",
    });
  }

  const problem = await leetcode.problem(name);
  if (!problem) {
    return res.status(400).json({
      status: "error",
      msg: "Please enter correct problem name",
    });
  }

  try {
    const entry = await User.findOneAndUpdate(
      {
        username: req.user,
      },
      {
        $push: {
          problems: {
            questionId: problem.questionId,
            name: problem.title,
            description: problem.content,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "ok",
      msg: "Problem added",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      msg: "Problem could not be added",
    });
  }
}

async function getAllProblems(req, res) {
  const user = req.user;
  const userData = await User.findOne({ username: user });
  res.status(200).json({
    status: "ok",
    payload: userData.problems,
  });
}

async function getProblemById(req, res) {
  const user = req.user;
  const id = req.params.id;
  const { problems } = await User.findOne({
    username: user,
  });
  const response = problems.filter((p) => {
    return p.questionId === id;
  });

  res.status(200).json({
    status: "ok",
    payload: response,
  });
}

async function submitProblem(req, res) {
  const { code, input, lang } = req.body;
  if (!code) {
    return res.status(400).json({
      status: "error",
      msg: "please provide code",
    });
  }
  try {
    const filePath = await generateFile(lang, code);
    const output = await executeCpp(filePath);
    return res.json({
      filePath,
      output,
    });
  } catch (error) {
    return res.json({ error: error });
  }
}

module.exports = {
  handleProblem,
  getAllProblems,
  getProblemById,
  submitProblem,
};
