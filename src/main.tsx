import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { SignInProvider } from "./utils/GlobalSignInState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SignInProvider>
      <App />
    </SignInProvider>
  </React.StrictMode>
);
