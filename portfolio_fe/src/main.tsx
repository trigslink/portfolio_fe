import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MCPPage from './app/mcp/page'; // Import your new page
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This is your home page (the App.tsx code) */}
        <Route path="/" element={<App />} />
        
        {/* This is your new MCP page */}
        <Route path="/mcp" element={<MCPPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);