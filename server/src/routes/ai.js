const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Initialize Hugging Face API configuration
const HF_API_URL =
	"https://api-inference.huggingface.co/models/bigcode/starcoder";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

router.post("/generate-commit", async (req, res) => {
	try {
		const { prompt, commitType, codeDiff } = req.body;

		if (!codeDiff) {
			return res.status(400).json({ error: "Code diff is required" });
		}

		// Prepare the prompt for the model
		const fullPrompt = `Generate a git commit message following the Conventional Commits specification for the following code changes.
		The commit type is "${commitType}".
		Focus on the main purpose and impact of the changes.
		Include a brief title and bullet points for details.

		Code changes:
		${codeDiff}

		Commit message:`;

		// Make request to Hugging Face API
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

		if (!response.ok) {
			throw new Error(`Hugging Face API error: ${response.statusText}`);
		}

		const data = await response.json();

		// Clean and format the generated message
		let message = data[0].generated_text.trim();

		// Ensure message starts with commit type if not already present
		if (!message.startsWith(`${commitType}:`)) {
			message = `${commitType}: ${message}`;
		}

		res.json({ message });
	} catch (error) {
		console.error("Error generating commit message:", error);
		res.status(500).json({
			error: "Failed to generate commit message",
			details: error.message,
		});
	}
});

module.exports = router;
