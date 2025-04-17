import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import CodeFormatter from './pages/CodeFormatter';
import MarkdownPreview from './pages/MarkdownPreview';
import RegexTester from './pages/RegexTester';
import JsonFormatter from './pages/JsonFormatter';
import SnippetManager from './pages/SnippetManager';
import UuidGenerator from './components/UuidGenerator';
import ColorPalette from './pages/ColorPalette';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code-formatter" element={<CodeFormatter />} />
            <Route path="/markdown-preview" element={<MarkdownPreview />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/uuid-generator" element={<UuidGenerator />} />
            <Route path="/color-palette" element={<ColorPalette />} />
            <Route path="/snippets" element={<SnippetManager />} />
          </Routes>
        </MainLayout>
        <Toaster
          position="bottom-right"
          theme="dark"
          closeButton
          richColors
        />
      </Router>
    </Provider>
  );
};

export default App;
