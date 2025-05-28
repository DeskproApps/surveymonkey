import './instrument';
import { DeskproAppProvider } from "@deskpro/app-sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { query } from "./utils/query";
import { QueryClientProvider } from "@tanstack/react-query";
import "./main.css";
import "simplebar/dist/simplebar.min.css";
import { Scrollbar } from "@deskpro/deskpro-ui";
import { reactErrorHandler } from '@sentry/react';

const root = ReactDOM.createRoot(document.getElementById('root') as Element, {
  onRecoverableError: reactErrorHandler(),
});
root.render(
  <React.StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <DeskproAppProvider>
        <QueryClientProvider client={query}>
          <App />
        </QueryClientProvider>
      </DeskproAppProvider>
    </Scrollbar>
  </React.StrictMode>
);
