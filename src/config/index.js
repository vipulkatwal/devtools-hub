export const config = {
	API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
	GITHUB: {
		CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
		REDIRECT_URI: import.meta.env.VITE_GITHUB_REDIRECT_URI,
	},
	GOOGLE: {
		CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
	},
};

// API endpoints
export const API_ENDPOINTS = {
	// Auth endpoints
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		GITHUB: "/auth/github",
		GOOGLE: "/auth/google",
		REFRESH_TOKEN: "/auth/refresh-token",
		VERIFY_EMAIL: "/auth/verify-email",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",
	},
	// User endpoints
	USER: {
		PROFILE: "/user/profile",
		UPDATE_PROFILE: "/user/profile",
		CHANGE_PASSWORD: "/user/change-password",
	},
	// Snippet endpoints
	SNIPPETS: {
		BASE: "/snippets",
		GET_ALL: "/snippets",
		CREATE: "/snippets",
		GET_ONE: (id) => `/snippets/${id}`,
		UPDATE: (id) => `/snippets/${id}`,
		DELETE: (id) => `/snippets/${id}`,
		SEARCH: "/snippets/search",
		TAGS: "/snippets/tags",
	},
	// Code formatter endpoints
	CODE_FORMATTER: {
		FORMAT: "/code-formatter/format",
		MINIFY: "/code-formatter/minify",
		BEAUTIFY: "/code-formatter/beautify",
	},
	// JSON formatter endpoints
	JSON_FORMATTER: {
		FORMAT: "/json-formatter/format",
		VALIDATE: "/json-formatter/validate",
		MINIFY: "/json-formatter/minify",
		BEAUTIFY: "/json-formatter/beautify",
	},
};
