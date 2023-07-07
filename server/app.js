const express = require("express");
const app = express();
const apiRoutes =require("./routes/index");
const mongoose =require("mongoose");
const {connectToMongoDB,PORT,MONGO_URL,CLIENT_URL} =require("./connect");
const cors=require('cors');


connectToMongoDB(MONGO_URL).then(()=>{
  console.log("mongodb connected");
});

//middlewares
app.use(express.json());
app.use(cors({
  origin:CLIENT_URL,
  methods:['GET',"POST"],
}));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api",apiRoutes);















app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
