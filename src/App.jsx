import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import CodeFormatter from "./pages/CodeFormatter";
import Features from "./pages/Features";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Dashboard from './pages/Dashboard';
import RegexTester from './pages/RegexTester';
import JsonFormatter from './pages/JsonFormatter';
import SnippetManager from './pages/SnippetManager';
import UuidGenerator from './components/UuidGenerator';
import ColorPalette from './pages/ColorPalette';
import LoremIpsum from './pages/LoremIpsum';
import DiffChecker from './pages/DiffChecker';
import IconPicker from './pages/IconPicker';
import BreakpointTester from './pages/BreakpointTester';
import JwtDecoder from './pages/JwtDecoder';
import ReadmeGenerator from './pages/ReadmeGenerator';
import CssTools from './pages/CssTools';
import MetaTags from './pages/MetaTags';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-formatter" element={<CodeFormatter />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/uuid-generator" element={<UuidGenerator />} />
            <Route path="/color-palette" element={<ColorPalette />} />
            <Route path="/snippets" element={<SnippetManager />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/diff-checker" element={<DiffChecker />} />
            <Route path="/icon-picker" element={<IconPicker />} />
            <Route path="/breakpoint-tester" element={<BreakpointTester />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/readme-generator" element={<ReadmeGenerator />} />
            <Route path="/css-tools" element={<CssTools />} />
            <Route path="/meta-tags" element={<MetaTags />} />
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
