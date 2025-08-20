import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/index.tsx";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from './context/LoginUserContext';
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(_jsxDEV(BrowserRouter, { future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true, // ← 警告回避用フラグ
        }, children: _jsxDEV(Provider, { children: _jsxDEV(App, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 19, columnNumber: 9 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 18, columnNumber: 7 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 11, columnNumber: 34 }, this));
}
else {
    console.error('Failed to find the root element.');
}
