import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	code: "",
	language: "javascript",
	formattedCode: "",
	settings: {
		indentSize: 2,
		useTabs: false,
		lineWidth: 80,
	},
	history: [],
};

export const codeFormatterSlice = createSlice({
	name: "codeFormatter",
	initialState,
	reducers: {
		setCode: (state, action) => {
			state.code = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setFormattedCode: (state, action) => {
			state.formattedCode = action.payload;
		},
		updateSettings: (state, action) => {
			state.settings = { ...state.settings, ...action.payload };
		},
		addToHistory: (state, action) => {
			state.history.unshift(action.payload);
			if (state.history.length > 10) {
				state.history.pop();
			}
		},
	},
});

export const {
	setCode,
	setLanguage,
	setFormattedCode,
	updateSettings,
	addToHistory,
} = codeFormatterSlice.actions;

export default codeFormatterSlice.reducer;
