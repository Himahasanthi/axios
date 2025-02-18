const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Import Routes
const studentRoutes = require("./routes/studentRoute");
const leaveRoutes = require("./routes/leaveApplicationRoute");
const feePaymentRoute = require("./routes/feePaymentRoute");
const examRoute = require("./routes/examResultRoute");
const calendarRoute = require("./routes/calendarRoute");
const attendanceRoute = require("./routes/attendanceRoute");
const assignmentRoute = require("./routes/assignmentRoute");
const analysisRoute = require("./routes/analysisRoute");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Initialize Express App
const app = express();
app.use(cookieParser());
app.use(express.json());

// ✅ Setup CORS for Frontend & Backend Deployment
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies
  })
);

// ✅ API Routes
app.use("/api/students", studentRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/fees", feePaymentRoute);
app.use("/api/exams", examRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/assignments", assignmentRoute);
app.use("/api/analysis", analysisRoute);
app.use("/api/auth", authRoutes);

// ✅ Serve Frontend from Backend (Render Deployment)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is working!" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
