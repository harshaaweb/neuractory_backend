const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const multer = require("multer");
const cookieParser = require("cookie-parser");
const fs = require("fs");
app.use(express.static(__dirname + "/"));
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Neuractory Backend is working..." });
});

//Loop of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4001",
  "http://localhost:4000",
  "https://provrblue.vercel.app",
  "https://neuractory.ai",
  "https://www.neuractory.ai",
];

//CORS policy access
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const connectDB = require("./config/database");
connectDB();

app.use("/api/getuser", require("./routes/user_register"));

// singup API
app.use("/api/signup", require("./routes/user_register"));

// login api
app.use("/api/login", require("./routes/login"));

// logout api
app.use("/api/logout", require("./routes/logout"));

// Profile req and res
app.use("/api/profile", require("./Profile/Userprofile"));

// plan api
app.use("/api/plans", require("./routes/Plans"));

// orders api
app.use("/api/orders", require("./routes/Order"));

// razor pay instance order api
app.use("/api/payment", require("./routes/payment"));

// contact us messages api
app.use("/api/contactus", require("./routes/contactus"));

app.listen(PORT, () => {
  console.log(`server is running on the new ${PORT}`);
});
