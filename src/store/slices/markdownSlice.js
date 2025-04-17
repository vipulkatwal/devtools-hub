import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	markdown: "",
	settings: {
		showLineNumbers: true,
		showTableOfContents: true,
		theme: "light",
	},
	history: [],
};

export const markdownSlice = createSlice({
	name: "markdown",
	initialState,
	reducers: {
		setMarkdown: (state, action) => {
			state.markdown = action.payload;
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

export const { setMarkdown, updateSettings, addToHistory } =
	markdownSlice.actions;

export default markdownSlice.reducer;
