import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPortal from "./core/AuthPortal";
import ClientTerritory from "./views/ClientTerritory";
import SuperUserHub from "./views/SuperUserHub";
import "./GlobalTokens.css";
import "./MasterStyles.css";

function RootApplication() {
  return (
    <Router>
      <div className="RootContainer">
        <Routes>
          <Route path="/" element={<AuthPortal />} />
          <Route path="/terminal/user" element={<ClientTerritory />} />
          <Route path="/terminal/admin" element={<SuperUserHub />} />
          
          {/* Fallback for old routes or typos */}
          <Route path="/user" element={<Navigate to="/terminal/user" replace />} />
          <Route path="/admin" element={<Navigate to="/terminal/admin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RootApplication;
