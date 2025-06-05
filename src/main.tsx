
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a more robust root element finder
const rootElement = document.getElementById("root");
if (!rootElement) {
  // Create the root element if it doesn't exist
  const newRoot = document.createElement("div");
  newRoot.id = "root";
  document.body.appendChild(newRoot);
  createRoot(newRoot).render(<App />);
} else {
  createRoot(rootElement).render(<App />);
}
