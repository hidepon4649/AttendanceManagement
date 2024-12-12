import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element.");
}
