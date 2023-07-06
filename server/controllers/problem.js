const User = require("../models/user");
const { LeetCode } = require("leetcode-query");
const leetcode = new LeetCode();

const { exec, spawn, execFileSync } = require("child_process");
const fs = require("fs");


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
  if(!user){
    res.status(400).json({
      status: "error",
      msg: "Please login",
    });
  }
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
  const { code, input } = req.body;
  if(!code){
    return res.json({
      status:"error",
      msg:'Please provide code to execute',
      output:""
    })
  }
  const timeoutDuration = 4000; 
  try {
    fs.writeFileSync("./temp.cpp", code);
    fs.writeFileSync("./output.txt", "");
  } catch (error) {
    // console.log(error);
  }
  const childProcess1 = exec(
    "g++ ./temp.cpp -o executable",
    (error, stdout, stderr) => {
      if (error) {
        // console.log(`compilationn error1:from here`);
        return res.json({
          status: "error",
          msg:"compilationn error",
          output:error.message,
        });
      }
      if (stderr) {
        // console.log(`compilationn error2:${stderr}`);
        return res.json({
          status:"error" ,
          msg:"compilationn error" ,
          output: stderr,
        });
      } else {
        // console.log("Program compiled succesfully");
        fs.truncateSync("./output.txt");
        const childProcess2 = spawn("./executable");

        const timeout = setTimeout(() => {
          childProcess2.kill(); // Terminate the child process
          // console.log("Program execution timed out");
        }, timeoutDuration);

        childProcess2.stdout.on("data", (data) => {
          console.log(`program output:${data}`);
          fs.appendFileSync("./output.txt", data);
        });
        childProcess2.stderr.on("data", (data) => {
          // console.log(`Runtime error:${data}`);
          clearTimeout(timeout);
          return res.json({
            status:"error",
            msg: "Runtime error",
            output: data,
          });
        });
        childProcess2.stdin.write(input, (error) => {
          if (error) {
            // console.log(`Error in input:${error}`);
          } else {
            // console.log(`Input taken succesfully`);
          }
        });
        childProcess2.stdin.end();
        childProcess2.on("close", (code) => {
        clearTimeout(timeout);
          const outputValues = fs.readFileSync("./output.txt", "utf-8");
          const outputLength=outputValues.length;
          if(outputLength>10000){
            return res.json({
              status:"error",
              msg: "SIGTERM",
              output:'please check for infinite process',
            });
          }
          return res.json({
            status:"ok",
            msg: "Program executed successfully",
            output: outputValues,
          });
        });
      }
    }
  );
}

module.exports = {
  handleProblem,
  getAllProblems,
  getProblemById,
  submitProblem,
};
