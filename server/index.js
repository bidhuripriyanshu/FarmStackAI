const { connectDB } = require("./config/db"); //connectDB is a function that connects to the database
const express = require("express"); //express is a framework for building web applications
const cors = require("cors"); //cors is a middleware that allows cross-origin requests
require("dotenv").config(); //dotenv is a module that loads environment variables from a .env file into process.env
const cookieParser = require("cookie-parser"); //cookieParser is a middleware that parses cookies
const authRoute = require("./Routes/AuthRoute"); //authRoute is a route that handles authentication
const dataRoute = require("./Routes/DataRoute"); //dataRoute is a route that handles data
const cropRoute = require("./Routes/CropRoute"); //cropRoute is a route that handles crops
const postRoute = require("./Routes/PostRoute"); //postRoute is a route that handles posts
const commentRoute = require("./Routes/CommentRoute"); //commentRoute is a route that handles comments
const { PORT } = process.env; //PORT is the port number that the server will listen on


const app = express(); //create an express application

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://farm-stack-ai.vercel.app"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(cookieParser());
app.use(express.json());  
//express.json(): The express.json() will add a body property to the request or req object. This includes the request body's parsed JSON data. req.body in your route handler function will allow you to access this data

// Routes
app.use("/", authRoute);
app.use("/", dataRoute);
app.use("/", cropRoute);
app.use("/", postRoute);
app.use("/", commentRoute);

// Adding by priyanshu
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to database and start server
connectDB(); //connect to the database

// Start server only after database connection is established
if (!PORT) {
  console.error("PORT is not defined in environment variables. Please check your .env file.");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
}); 
