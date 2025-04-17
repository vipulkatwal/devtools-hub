import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Async thunks for API calls
export const fetchJsonData = createAsyncThunk(
	"json/fetchJsonData",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/json-data`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createJsonData = createAsyncThunk(
	"json/createJsonData",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/json-data`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateJsonData = createAsyncThunk(
	"json/updateJsonData",
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${API_URL}/json-data/${id}`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteJsonData = createAsyncThunk(
	"json/deleteJsonData",
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(`${API_URL}/json-data/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	items: [],
	currentItem: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	input: "",
	output: "",
	settings: {
		minify: false,
		sortKeys: false,
		indentSize: 2,
		removeComments: false,
		fontSize: 14,
		theme: "light",
		wordWrap: true,
		lineNumbers: true,
	},
};

const jsonSlice = createSlice({
	name: "json",
	initialState,
	reducers: {
		setSettings: (state, action) => {
			state.settings = { ...state.settings, ...action.payload };
		},
		setCurrentItem: (state, action) => {
			state.currentItem = action.payload;
		},
		clearCurrentItem: (state) => {
			state.currentItem = null;
		},
		setInput: (state, action) => {
			state.input = action.payload;
			state.error = null;
		},
		setOutput: (state, action) => {
			state.output = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		clearJson: (state) => {
			state.input = "";
			state.output = "";
			state.error = null;
		},
		updateSettings: (state, action) => {
			state.settings = { ...state.settings, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch JSON data
			.addCase(fetchJsonData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchJsonData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(fetchJsonData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload?.message || "Failed to fetch JSON data";
			})
			// Create JSON data
			.addCase(createJsonData.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			// Update JSON data
			.addCase(updateJsonData.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(item) => item._id === action.payload._id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			// Delete JSON data
			.addCase(deleteJsonData.fulfilled, (state, action) => {
				state.items = state.items.filter((item) => item._id !== action.payload);
			});
	},
});

export const {
	setSettings,
	setCurrentItem,
	clearCurrentItem,
	setInput,
	setOutput,
	setError,
	clearJson,
	updateSettings,
} = jsonSlice.actions;

export default jsonSlice.reducer;
