import { configureStore } from "@reduxjs/toolkit";
import codeFormatterReducer from "./slices/codeFormatterSlice";
import markdownReducer from "./slices/markdownSlice";
import regexReducer from "./slices/regexSlice";
import snippetsReducer from "./slices/snippetsSlice";
import settingsReducer from "./slices/settingsSlice";
import jsonReducer from "./slices/jsonSlice";

export const store = configureStore({
	reducer: {
		codeFormatter: codeFormatterReducer,
		markdown: markdownReducer,
		regex: regexReducer,
		snippets: snippetsReducer,
		settings: settingsReducer,
		json: jsonReducer,
	},
});
