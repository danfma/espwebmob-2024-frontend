import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";
import {createUserStore} from "@stores/user-store.ts";
import {UserStoreProvider} from "@views/shared/hooks";
import App from "@views/App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const userStore = createUserStore();

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <UserStoreProvider value={userStore}>
        <App />
      </UserStoreProvider>
    </BrowserRouter>
  </StrictMode>
);

