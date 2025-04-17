import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	snippets: [],
	currentSnippet: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	searchQuery: "",
	selectedTags: [],
	filteredSnippets: [],
	sortBy: "date", // 'date' | 'title' | 'language'
	sortOrder: "desc", // 'asc' | 'desc'
};

// Helper function to sort snippets
const sortSnippets = (snippets, sortBy, sortOrder) => {
	return [...snippets].sort((a, b) => {
		let comparison = 0;
		switch (sortBy) {
			case "date":
				comparison = new Date(b.createdAt) - new Date(a.createdAt);
				break;
			case "title":
				comparison = a.title.localeCompare(b.title);
				break;
			case "language":
				comparison = a.language.localeCompare(b.language);
				break;
			default:
				comparison = 0;
		}
		return sortOrder === "asc" ? comparison : -comparison;
	});
};

const snippetsSlice = createSlice({
	name: "snippets",
	initialState,
	reducers: {
		setSnippets: (state, action) => {
			state.snippets = action.payload;
			state.status = "succeeded";
			// Update filtered snippets when all snippets are set
			state.filteredSnippets = sortSnippets(
				action.payload,
				state.sortBy,
				state.sortOrder
			);
		},
		setCurrentSnippet: (state, action) => {
			state.currentSnippet = action.payload;
		},
		addSnippet: (state, action) => {
			state.snippets.push(action.payload);
			// Update filtered snippets when a new snippet is added
			if (state.searchQuery || state.selectedTags.length > 0) {
				const matchesSearch =
					!state.searchQuery ||
					action.payload.title
						.toLowerCase()
						.includes(state.searchQuery.toLowerCase()) ||
					action.payload.description
						.toLowerCase()
						.includes(state.searchQuery.toLowerCase()) ||
					action.payload.tags.some((tag) =>
						tag.toLowerCase().includes(state.searchQuery.toLowerCase())
					);

				const matchesTags =
					state.selectedTags.length === 0 ||
					state.selectedTags.every((tag) => action.payload.tags.includes(tag));

				if (matchesSearch && matchesTags) {
					state.filteredSnippets = sortSnippets(
						[...state.filteredSnippets, action.payload],
						state.sortBy,
						state.sortOrder
					);
				}
			} else {
				state.filteredSnippets = sortSnippets(
					[...state.filteredSnippets, action.payload],
					state.sortBy,
					state.sortOrder
				);
			}
		},
		updateSnippet: (state, action) => {
			const index = state.snippets.findIndex(
				(snippet) => snippet.id === action.payload.id
			);
			if (index !== -1) {
				state.snippets[index] = action.payload;
				updateFilteredSnippets(state);
			}
		},
		deleteSnippet: (state, action) => {
			state.snippets = state.snippets.filter(
				(snippet) => snippet.id !== action.payload
			);
			// Also remove from filtered snippets
			state.filteredSnippets = state.filteredSnippets.filter(
				(snippet) => snippet.id !== action.payload
			);
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
			updateFilteredSnippets(state);
		},
		setSelectedTags: (state, action) => {
			state.selectedTags = action.payload;
			updateFilteredSnippets(state);
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;
			state.filteredSnippets = sortSnippets(
				state.filteredSnippets,
				action.payload,
				state.sortOrder
			);
		},
		setSortOrder: (state, action) => {
			state.sortOrder = action.payload;
			state.filteredSnippets = sortSnippets(
				state.filteredSnippets,
				state.sortBy,
				action.payload
			);
		},
	},
});

// Helper function to update filtered snippets based on search query and selected tags
const updateFilteredSnippets = (state) => {
	if (!state.searchQuery && state.selectedTags.length === 0) {
		// If no search query and no tags selected, show all snippets
		state.filteredSnippets = sortSnippets(
			state.snippets,
			state.sortBy,
			state.sortOrder
		);
	} else {
		// Filter snippets based on search query and selected tags
		const query = state.searchQuery.toLowerCase();
		const filtered = state.snippets.filter((snippet) => {
			const matchesSearch =
				!state.searchQuery ||
				snippet.title.toLowerCase().includes(query) ||
				snippet.description.toLowerCase().includes(query) ||
				snippet.tags.some((tag) => tag.toLowerCase().includes(query));

			const matchesTags =
				state.selectedTags.length === 0 ||
				state.selectedTags.every((tag) => snippet.tags.includes(tag));

			return matchesSearch && matchesTags;
		});

		state.filteredSnippets = sortSnippets(
			filtered,
			state.sortBy,
			state.sortOrder
		);
	}
};

export const {
	setSnippets,
	setCurrentSnippet,
	addSnippet,
	updateSnippet,
	deleteSnippet,
	setStatus,
	setError,
	setSearchQuery,
	setSelectedTags,
	setSortBy,
	setSortOrder,
} = snippetsSlice.actions;

export default snippetsSlice.reducer;
