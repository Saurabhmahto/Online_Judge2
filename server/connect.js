const mongoose = require("mongoose");
const dontenv = require('dotenv');
dontenv.config();
async function connectToMongoDB(url) {
  return   mongoose.connect(url);
}
module.exports={
    connectToMongoDB,
    PORT:process.env.PORT
}