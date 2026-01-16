const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error("Please check:");
    console.error("1. Your MONGO_URL in .env file is correct");
    console.error("2. Your MongoDB Atlas cluster is running and accessible");
    console.error("3. Your IP address is whitelisted in MongoDB Atlas");
    console.error("4. Your network connection is stable");
    process.exit(1);
  }
};

module.exports = {connectDB};
