const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoute = require("./Routes/AuthRoute");
const dataRoute = require("./Routes/DataRoute");
const cropRoute = require("./Routes/CropRoute");
const postRoute = require("./Routes/PostRoute");
const commentRoute = require("./Routes/CommentRoute");

const connectDB = require("./config/db"); // adjust path if needed
const { PORT } = process.env;

const app = express();

// ✅ CORS — MUST BE FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://farm-stack-ai.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ REQUIRED for Vercel
app.options("*", cors());

// Other middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute);
app.use("/", dataRoute);
app.use("/", cropRoute);
app.use("/", postRoute);
app.use("/", commentRoute);

app.get("/", (req, res) => {
  res.send("Hello World Priyanshu Bidhuri");
});

// DB
connectDB();

// Local only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ✅ IMPORTANT for Vercel
module.exports = app;
