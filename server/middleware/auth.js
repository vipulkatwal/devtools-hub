const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	// Get token from header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	// Get token from cookie
	else if (req.cookies?.token) {
		token = req.cookies.token;
	}

	// Check if token exists
	if (!token) {
		res.status(401);
		throw new Error("Not authorized to access this route");
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Get user from token
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized to access this route");
	}
});

// Grant access to specific roles
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403);
			throw new Error(
				`User role ${req.user.role} is not authorized to access this route`
			);
		}
		next();
	};
};
