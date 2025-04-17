import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.error || error.message || "An error occurred";

		// Handle token expiration
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
			toast.error("Session expired. Please login again.");
		} else {
			toast.error(message);
		}

		return Promise.reject(error);
	}
);

export default api;
