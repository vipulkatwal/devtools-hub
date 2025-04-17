import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import {
  setCurrentSnippet,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  setSearchQuery,
  setSelectedTags,
  setSortBy,
  setSortOrder,
} from '../store/slices/snippetsSlice';

const SnippetManager = () => {
  const dispatch = useDispatch();
  const {
    snippets,
    currentSnippet,
    searchQuery,
    selectedTags,
    sortBy,
    sortOrder,
  } = useSelector((state) => state.snippets);

  const [tagInput, setTagInput] = useState('');

  // Initialize currentSnippet if it's null
  useEffect(() => {
    if (currentSnippet === null) {
      dispatch(
        setCurrentSnippet({
          id: null,
          title: '',
          code: '',
          language: 'javascript',
          tags: [],
          description: '',
        })
      );
    }
  }, [dispatch, currentSnippet]);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
  ];

  const allTags = Array.from(
    new Set(snippets.flatMap((snippet) => snippet.tags))
  ).sort();

  const filteredSnippets = snippets
    .filter((snippet) => {
      const matchesSearch = snippet.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => snippet.tags.includes(tag));
      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.createdAt) - new Date(a.createdAt);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'language':
          comparison = a.language.localeCompare(b.language);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSave = () => {
    if (currentSnippet.id) {
      dispatch(updateSnippet(currentSnippet));
    } else {
      dispatch(addSnippet(currentSnippet));
    }
    dispatch(
      setCurrentSnippet({
        id: null,
        title: '',
        code: '',
        language: 'javascript',
        tags: [],
        description: '',
      })
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      dispatch(deleteSnippet(id));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !currentSnippet.tags.includes(tagInput.trim())) {
      dispatch(
        setCurrentSnippet({
          ...currentSnippet,
          tags: [...currentSnippet.tags, tagInput.trim()],
        })
      );
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    dispatch(
      setCurrentSnippet({
        ...currentSnippet,
        tags: currentSnippet.tags.filter((t) => t !== tag),
      })
    );
  };

  // If currentSnippet is still null, show a loading state
  if (currentSnippet === null) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Snippet Manager
        </h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="language">Sort by Language</option>
          </select>
          <button
            onClick={() =>
              dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))
            }
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={currentSnippet.title}
                  onChange={(e) =>
                    dispatch(
                      setCurrentSnippet({ ...currentSnippet, title: e.target.value })
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={currentSnippet.description}
                  onChange={(e) =>
                    dispatch(
                      setCurrentSnippet({
                        ...currentSnippet,
                        description: e.target.value,
                      })
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <select
                  value={currentSnippet.language}
                  onChange={(e) =>
                    dispatch(
                      setCurrentSnippet({
                        ...currentSnippet,
                        language: e.target.value,
                      })
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {currentSnippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form onSubmit={handleAddTag} className="mt-2 flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md"
                    placeholder="Add a tag"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Code
                </label>
                <div className="mt-1 h-[300px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    language={currentSnippet.language}
                    value={currentSnippet.code}
                    onChange={(value) =>
                      dispatch(
                        setCurrentSnippet({ ...currentSnippet, code: value })
                      )
                    }
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      wordWrap: 'on',
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() =>
                    dispatch(
                      setCurrentSnippet({
                        id: null,
                        title: '',
                        code: '',
                        language: 'javascript',
                        tags: [],
                        description: '',
                      })
                    )
                  }
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Snippet
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Search snippets..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by Tags
                </label>
                <div className="mt-2 space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...selectedTags, tag]
                            : selectedTags.filter((t) => t !== tag);
                          dispatch(setSelectedTags(newTags));
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Snippets
            </h2>
            <div className="space-y-4">
              {filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {snippet.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {snippet.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => dispatch(setCurrentSnippet(snippet))}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(snippet.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Language: {snippet.language}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetManager;