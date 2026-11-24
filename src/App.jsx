
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ToastProvider } from "./context/ToastContext";

import SiteLayout from "./layouts/SiteLayout";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import FocusPage from "./pages/FocusPage";
import SettingsPage from "./pages/SettingsPage";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-3 text-sm text-[var(--muted)]">
        Oops! This page doesn't exist.
      </p>

      <a href="/" className="mt-5 underline">
        Back to Dashboard
      </a>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NotificationProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SiteLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="focus" element={<FocusPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </NotificationProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
