import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import DPRForm from "./pages/DPRForm";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/projects" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f1f5f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f1f5f9",
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dpr"
          element={
            <ProtectedRoute>
              <DPRForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dpr/:projectId"
          element={
            <ProtectedRoute>
              <DPRForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
