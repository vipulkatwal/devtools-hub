import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { setMarkdown, updateSettings } from '../store/slices/markdownSlice';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownPreview = () => {
  const dispatch = useDispatch();
  const { markdown, settings } = useSelector((state) => state.markdown);

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleMarkdownChange = (value) => {
    dispatch(setMarkdown(value));
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const renderMarkdown = () => {
    return (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
            settings.showTableOfContents && remarkToc,
          ].filter(Boolean)}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Markdown Preview
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={togglePreviewMode}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Editor
          </h2>
          <div className="h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language="markdown"
              value={markdown}
              onChange={handleMarkdownChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: settings.showLineNumbers ? 'on' : 'off',
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview
          </h2>
          <div className="h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto p-4 bg-white dark:bg-gray-800">
            {renderMarkdown()}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Preview Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showLineNumbers}
                onChange={(e) =>
                  dispatch(updateSettings({ showLineNumbers: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Show Line Numbers
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showTableOfContents}
                onChange={(e) =>
                  dispatch(
                    updateSettings({ showTableOfContents: e.target.checked })
                  )
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Show Table of Contents
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;