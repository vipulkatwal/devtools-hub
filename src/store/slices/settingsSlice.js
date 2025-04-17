import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "light",
	fontSize: 14,
	lineNumbers: true,
	wordWrap: true,
	minimap: false,
	autoSave: true,
	autoSaveInterval: 30000, // 30 seconds
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setFontSize: (state, action) => {
			state.fontSize = action.payload;
		},
		setLineNumbers: (state, action) => {
			state.lineNumbers = action.payload;
		},
		setWordWrap: (state, action) => {
			state.wordWrap = action.payload;
		},
		setMinimap: (state, action) => {
			state.minimap = action.payload;
		},
		setAutoSave: (state, action) => {
			state.autoSave = action.payload;
		},
		setAutoSaveInterval: (state, action) => {
			state.autoSaveInterval = action.payload;
		},
	},
});

export const {
	setTheme,
	setFontSize,
	setLineNumbers,
	setWordWrap,
	setMinimap,
	setAutoSave,
	setAutoSaveInterval,
} = settingsSlice.actions;

export default settingsSlice.reducer;
