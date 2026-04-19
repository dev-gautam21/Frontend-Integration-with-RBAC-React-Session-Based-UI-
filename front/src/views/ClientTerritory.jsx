import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Fade, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SessionManager } from "../utils/sessionHelper";

const ClientTerritory = () => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const identity = SessionManager.getIdentity();
  const clearance = SessionManager.getRole();

  useEffect(() => {
    if (!clearance) {
      navigate("/");
    }
  }, [clearance, navigate]);

  const requestProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: SessionManager.getToken() },
      });
      setSessionData(response.data);
    } catch (err) {
      console.error("Transmission Interrupted");
    }
  };

  const terminate = () => {
    SessionManager.terminateSession();
    navigate("/");
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--noir-dark)' }}>
      <Navbar className="nav-monolith justify-content-between">
        <Navbar.Brand className="title-gold" style={{ fontSize: '1.2rem' }}>
          Identity Node: {clearance}
        </Navbar.Brand>
        <Nav className="align-items-center">
          <Typography variant="body2" sx={{ color: 'var(--text-dim)', mr: 3 }}>
            LOGGED AS: <span style={{ color: 'var(--text-platinum)' }}>{identity}</span>
          </Typography>
          <button className="btn-ghost btn-sm" onClick={terminate}>Disconnect</button>
        </Nav>
      </Navbar>

      <Container className="mt-5">
        <Fade in timeout={1000}>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <div className="monolith-card">
              <Box className="d-flex align-items-center mb-4">
                <AccountCircleIcon sx={{ fontSize: 60, color: 'var(--gold-primary)', mr: 3 }} />
                <Box>
                  <Typography variant="h5" className="title-gold">Client Territory</Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-dim)' }}>
                    SESSION KEY: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ bgcolor: 'var(--border-subtle)', mb: 4 }} />

              <Box className="mb-5">
                <Typography variant="h6" sx={{ color: 'var(--text-platinum)', mb: 2 }}>
                  Sub-System Status
                </Typography>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                  <Typography variant="body1" sx={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
                    Current Authorization Level: <span className="status-badge">{clearance}</span>
                    <br />
                    Network integrity check passed. You have encrypted access to your localized profile parameters.
                  </Typography>
                </div>
              </Box>

              <div className="d-flex gap-4">
                <button className="btn-action" onClick={requestProfile}>
                  Extract Profile Data
                </button>
                
                {clearance === "ADMIN" && (
                  <button className="btn-ghost" onClick={() => navigate("/terminal/admin")}>
                    Admin Terminal
                  </button>
                )}
              </div>

              {sessionData && (
                <Fade in>
                  <Box className="mt-5 p-3" sx={{ borderLeft: '3px solid var(--gold-primary)', background: 'rgba(212, 175, 55, 0.05)' }}>
                    <Typography variant="overline" color="primary">Decrypted Data Buffer:</Typography>
                    <pre style={{ color: 'var(--gold-bright)', marginTop: '10px' }}>
                      {JSON.stringify(sessionData, null, 2)}
                    </pre>
                  </Box>
                </Fade>
              )}
            </div>
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default ClientTerritory;
