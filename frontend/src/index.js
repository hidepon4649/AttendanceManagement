"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
require("./index.css");
const App_1 = __importDefault(require("./App"));
const rootElement = document.getElementById('root');
if (rootElement) {
    (0, client_1.createRoot)(rootElement).render((0, jsx_runtime_1.jsx)(App_1.default, {}));
}
else {
    console.error("Failed to find the root element.");
}
