import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./views/App.tsx";
import {BrowserRouter} from "react-router";
import "./index.css";

const container = document.getElementById("root")!;

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

