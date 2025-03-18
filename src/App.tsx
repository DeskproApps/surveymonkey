import { AdminCallbackPage, HomePage, LoadingPage, LoginPage, VerifySettingsPage } from "./pages";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";


function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Routes>
                <Route index element={<LoadingPage />} />
                <Route path="/admin/callback" element={<AdminCallbackPage/>} />
                <Route path="/admin/verify_settings" element={<VerifySettingsPage/>} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    </HashRouter>
  );
}

export default App;
