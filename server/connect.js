const mongoose = require("mongoose");
const dontenv = require('dotenv');
dontenv.config();
async function connectToMongoDB(url) {
  return   mongoose.connect(url);
}
module.exports={
    connectToMongoDB,
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    CLIENT_URL:process.env.CLIENT_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,

}
