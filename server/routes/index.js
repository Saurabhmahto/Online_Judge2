const express =require('express');
const router =express.Router();
const userRoutes=require("./v1/user");
const problemRoutes=require("./v1/problem");

router.use('/v1/user',userRoutes);
router.use('/v1/problem',problemRoutes);


module.exports=router;
