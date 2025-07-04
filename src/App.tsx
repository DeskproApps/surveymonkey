import { LoadingSpinner } from "@deskpro/app-sdk";
import { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { VerifySettings } from "./pages/VerifySettings";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import { Redirect } from "./components/Redirect/Redirect";
import { ErrorBoundary } from "@sentry/react";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
              <Routes>
                <Route path="/admin/verify_settings" element={<VerifySettings/>} />
                <Route path="/redirect" element={<Redirect />} />
                <Route index element={<Main />} />
              </Routes>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    </HashRouter>
  );
}

export default App;
