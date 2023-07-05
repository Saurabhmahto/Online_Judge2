const express = require("express");
const router = express.Router();
const {handleProblem,getAllProblems,getProblemById} =require('../../controllers/problem');
const {authenticate} =require('../../middlewares/auth')

router.post('/',authenticate, handleProblem);
router.get('/',authenticate, getAllProblems);
router.get('/:id',authenticate, getProblemById);


module.exports = router;
