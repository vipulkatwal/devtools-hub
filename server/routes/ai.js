const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const router = express.Router();

// Initialize Hugging Face API configuration
const HF_API_URL =
	"https://api-inference.huggingface.co/models/bigcode/starcoder";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Add model loading check
let isModelLoading = false;

// Helper function to handle model loading
const handleModelLoading = async () => {
	if (isModelLoading) {
		throw new Error(
			"Model is still loading. Please try again in a few seconds."
		);
	}
};

// Verify API key is loaded
console.log("Hugging Face API Key loaded:", !!HF_API_KEY);

// Health check endpoint for Hugging Face API
router.get("/health", async (req, res) => {
	try {
		const response = await fetch(HF_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${HF_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				inputs: "Test connection",
				parameters: {
					max_new_tokens: 5,
					return_full_text: false,
				},
			}),
		});

		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`);
		}

		res.json({ status: "healthy", message: "Connected to Hugging Face API" });
	} catch (error) {
		res.status(503).json({
			status: "unhealthy",
			message: "Failed to connect to Hugging Face API",
			error: error.message,
		});
	}
});

router.post("/generate-commit", async (req, res) => {
	try {
		const { commitType, codeDiff } = req.body;
		console.log("Received request with commit type:", commitType);

		if (!codeDiff) {
			return res.status(400).json({ error: "Code diff is required" });
		}

		if (!HF_API_KEY) {
			throw new Error("Hugging Face API key is not configured");
		}

		// Prepare the prompt for the model
		const fullPrompt = `Generate a git commit message following the Conventional Commits specification for the following code changes.
    The commit type is "${commitType}".
    Focus on the main purpose and impact of the changes.
    Include a brief title and bullet points for details.

    Code changes:
    ${codeDiff}

    Commit message:`;

		console.log("Making request to Hugging Face API...");

		const response = await fetch(HF_API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${HF_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				inputs: fullPrompt,
				parameters: {
					max_new_tokens: 250,
					temperature: 0.7,
					top_p: 0.95,
					do_sample: true,
					return_full_text: false,
				},
			}),
		});

		console.log("API Response status:", response.status);

		// Handle rate limiting and model loading
		if (response.status === 503) {
			const error = await response.json();
			if (error.error.includes("Model is currently loading")) {
				throw new Error("Model is loading. Please try again in a few seconds.");
			}
		}

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Hugging Face API error response:", errorText);
			throw new Error(
				`Hugging Face API error: ${response.status} - ${errorText}`
			);
		}

		const data = await response.json();
		console.log("Received API response:", data);

		if (!data || !Array.isArray(data) || !data[0] || !data[0].generated_text) {
			console.error("Unexpected API response format:", data);
			throw new Error("Invalid response format from Hugging Face API");
		}

		// Clean and format the generated message
		let message = data[0].generated_text.trim();

		// Ensure message starts with commit type if not already present
		if (!message.startsWith(`${commitType}:`)) {
			message = `${commitType}: ${message}`;
		}

		console.log("Generated commit message:", message);
		res.json({ message });
	} catch (error) {
		console.error("Error in generate-commit route:", error);
		const statusCode = error.message.includes("Model is loading") ? 503 : 500;
		res.status(statusCode).json({
			error: "Failed to generate commit message",
			details: error.message,
			retry: statusCode === 503,
		});
	}
});

module.exports = router;
