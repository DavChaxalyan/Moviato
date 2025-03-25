import App from "./App";
import { createRoot } from "react-dom/client";
import "./themes/global.css";
import { AppProvider } from "./context api/useAppContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
root.render(
  <>
  <AppProvider>
    <App />
  </AppProvider>
  </>
);
