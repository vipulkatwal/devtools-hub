const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const jsonRoutes = require("./routes/json");
const snippetsRoutes = require("./routes/snippets");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
	windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000, // 15 minutes
	max: process.env.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Accept",
			"Access-Control-Allow-Origin",
		],
		exposedHeaders: ["Access-Control-Allow-Origin"],
	})
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);

// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGODB_URI || "mongodb://localhost:27017/devtools-hub",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/json", jsonRoutes);
app.use("/api/snippets", snippetsRoutes);

// Test route
app.get("/api/test", (req, res) => {
	res.json({ message: "Server is running!" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
	});
}

// Error handling middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server & exit process
	server.close(() => process.exit(1));
});

// Start server
const server = app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
	console.log(
		`Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
	);
	console.log(`API URL: http://localhost:${PORT}`);
});
