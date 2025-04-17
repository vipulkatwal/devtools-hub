import { useDispatch, useSelector } from 'react-redux';
import {
  setTheme,
  setFontSize,
  setLineNumbers,
  setWordWrap,
  setMinimap,
  setAutoSave,
  setAutoSaveInterval,
} from '../../store/slices/settingsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Global Settings
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Font Size
          </label>
          <input
            type="number"
            value={settings.fontSize}
            onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            min="8"
            max="24"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Editor Settings
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.lineNumbers}
                onChange={(e) => dispatch(setLineNumbers(e.target.checked))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Show Line Numbers
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.wordWrap}
                onChange={(e) => dispatch(setWordWrap(e.target.checked))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Enable Word Wrap
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.minimap}
                onChange={(e) => dispatch(setMinimap(e.target.checked))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Show Minimap
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Auto Save Settings
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => dispatch(setAutoSave(e.target.checked))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Enable Auto Save
              </span>
            </label>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Auto Save Interval (seconds)
              </label>
              <input
                type="number"
                value={settings.autoSaveInterval / 1000}
                onChange={(e) =>
                  dispatch(setAutoSaveInterval(parseInt(e.target.value) * 1000))
                }
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                min="5"
                max="300"
                disabled={!settings.autoSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;