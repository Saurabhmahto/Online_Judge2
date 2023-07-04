const User = require("../models/user");
const {LeetCode} =require('leetcode-query');
const leetcode = new LeetCode();
async function handleProblem(req,res){
const {name} =req.body;
if(!name){
    return res.status(400).json({
        status:'error',
        msg:'enter problem name',
    })
}
const problem = await leetcode.problem(name);
if(!problem){
    return res.status(400).json({
        status:'error',
        msg:'Please enter correct problem name',
    })
}
res.status(200).json({
    status:'ok',
    title:problem.title,
    des:problem.content,
})
}

module.exports={
    handleProblem,
}