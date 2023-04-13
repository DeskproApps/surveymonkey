import { DeskproAppProvider } from "@deskpro/app-sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { query } from "./utils/query";
import { QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <DeskproAppProvider>
        <App />
      </DeskproAppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
