import { useDispatch, useSelector } from "react-redux";
import { setJsonInput, updateSettings, clearJson } from "../store/slices/jsonSlice";
import Editor from "@monaco-editor/react";

const JsonValidator = () => {
  const dispatch = useDispatch();
  const { jsonInput, formattedJson, isValid, error, settings } = useSelector(
    (state) => state.json
  );

  const handleJsonChange = (value) => {
    dispatch(setJsonInput(value));
  };

  const handleSettingChange = (setting, value) => {
    dispatch(updateSettings({ [setting]: value }));
  };

  const handleClear = () => {
    dispatch(clearJson());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          JSON Validator & Formatter
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Input JSON
            </h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.sortKeys}
                  onChange={(e) => handleSettingChange("sortKeys", e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">Sort Keys</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.removeComments}
                  onChange={(e) =>
                    handleSettingChange("removeComments", e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Remove Comments
                </span>
              </label>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 dark:text-gray-300">
                  Indent Size:
                </label>
                <select
                  value={settings.indentSize}
                  onChange={(e) =>
                    handleSettingChange("indentSize", parseInt(e.target.value))
                  }
                  className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language="json"
              value={jsonInput}
              onChange={handleJsonChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>
          {!isValid && (
            <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Formatted JSON
          </h2>
          <div className="h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language="json"
              value={formattedJson}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonValidator;