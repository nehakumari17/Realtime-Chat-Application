import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import PublicRoute from "./authentication/PublicRoute";
import ProtectedRoute from "./authentication/ProtectedRoute";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-avatar"
          element={
            <ProtectedRoute>
              <SetAvatar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
