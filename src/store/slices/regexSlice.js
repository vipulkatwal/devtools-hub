import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pattern: "",
	testString: "",
	flags: {
		global: true,
		ignoreCase: false,
		multiline: false,
	},
	matches: [],
	isValid: true,
	error: null,
	history: [],
};

export const regexSlice = createSlice({
	name: "regex",
	initialState,
	reducers: {
		setPattern: (state, action) => {
			state.pattern = action.payload;
			try {
				new RegExp(action.payload, getFlagsString(state.flags));
				state.isValid = true;
				state.error = null;
			} catch (error) {
				state.isValid = false;
				state.error = error.message;
			}
		},
		setTestString: (state, action) => {
			state.testString = action.payload;
		},
		setFlags: (state, action) => {
			state.flags = { ...state.flags, ...action.payload };
		},
		setMatches: (state, action) => {
			state.matches = action.payload;
		},
		addToHistory: (state, action) => {
			state.history.unshift(action.payload);
			if (state.history.length > 10) {
				state.history.pop();
			}
		},
	},
});

const getFlagsString = (flags) => {
	return Object.entries(flags)
		.filter(([key, value]) => value)
		.map(([key]) => {
			switch (key) {
				case "global":
					return "g";
				case "ignoreCase":
					return "i";
				case "multiline":
					return "m";
				default:
					return "";
			}
		})
		.join("");
};

export const { setPattern, setTestString, setFlags, setMatches, addToHistory } =
	regexSlice.actions;

export default regexSlice.reducer;
