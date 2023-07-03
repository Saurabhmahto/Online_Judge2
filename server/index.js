const express = require("express");
const app = express();
const { generateFile } = require("./generatefile");
const { executeCpp } = require("./executeCpp");
const apiRoutes =require("./routes/index");
const mongoose =require("mongoose");
const {connectToMongoDB} =require("./connect")

connectToMongoDB('mongodb://127.0.0.1:27017/onlineJudge').then(()=>{
  console.log("mongodb connected");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api",apiRoutes);



















































// app.get("/", (req, res) => {
//   return res.json({
//     online: "compiler",
//   });
// });


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

app.listen(8000, () => {
  console.log("server started on port 8000");
});
