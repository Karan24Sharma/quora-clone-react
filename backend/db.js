const mongoose = require("mongoose");

const url =
  "mongodb://Narak:hzClFmJMd6wxJjob@ac-yi0mhhl-shard-00-00.5fugacq.mongodb.net:27017,ac-yi0mhhl-shard-00-01.5fugacq.mongodb.net:27017,ac-yi0mhhl-shard-00-02.5fugacq.mongodb.net:27017/?ssl=true&replicaSet=atlas-oranbh-shard-0&authSource=admin&retryWrites=true&w=majority";
  
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
