const express = require("express");
const router = express.Router();
const {handleProblem} =require('../../controllers/problem')

router.post('/',handleProblem);


module.exports = router;
