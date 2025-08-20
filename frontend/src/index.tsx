import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from './context/LoginUserContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true, // ← 警告回避用フラグ
      }}
    >
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  );
} else {
  console.error('Failed to find the root element.');
}
