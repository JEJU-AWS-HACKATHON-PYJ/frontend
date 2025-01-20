import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// React를 렌더링할 DOM 요소 선택
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Root container not found");
}
