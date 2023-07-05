const express = require("express");
const app = express();
const { generateFile } = require("./services/generatefile");
const { executeCpp } = require("./services/executeCpp");
const apiRoutes =require("./routes/index");
const mongoose =require("mongoose");
const {connectToMongoDB,PORT} =require("./connect");
const cors=require('cors');

connectToMongoDB('mongodb://127.0.0.1:27017/onlineJudge').then(()=>{
  console.log("mongodb connected");
});

//middlewares
app.use(express.json());
app.use(cors({
  origin:"http://localhost:1234",
  methods:['GET',"POST"],
}));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api",apiRoutes);




















































// app.post("/run", async (req, res) => {
//   const language = req.body.language;
//   const code = req.body.code;
//   if (code === undefined) {
//     return res.status(400).json({
//       error: "code not define",
//     });
//   }
//   try {
//     const filePath = await generateFile(language, code);
//     const output = await executeCpp(filePath);
//     res.json({
//       filePath,
//       output,
//     });
//   } catch (error) {
//     res.json({error:error});
//   }
// });

app.listen(PORT, () => {
  console.log("server started on port 8000");
});
