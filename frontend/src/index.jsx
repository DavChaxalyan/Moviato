import App from "./App";
import { createRoot } from "react-dom/client";
import "./themes/global.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
root.render(
  <>
    <App />
  </>
);
