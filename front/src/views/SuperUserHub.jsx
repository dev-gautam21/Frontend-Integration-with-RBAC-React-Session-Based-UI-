import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Fade, Grid, Paper, Divider } from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MemoryIcon from "@mui/icons-material/Memory";
import { SessionManager } from "../utils/sessionHelper";

const SuperUserHub = () => {
  const navigate = useNavigate();
  const identity = SessionManager.getIdentity();
  const clearance = SessionManager.getRole();

  useEffect(() => {
    if (clearance !== "ADMIN") {
      navigate("/");
    }
  }, [clearance, navigate]);

  const accessCoreEngine = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/dashboard", {
        headers: { Authorization: SessionManager.getToken() },
      });
      alert("SYSTEM ADVISORY: Core data retrieved. Level: 0");
    } catch (err) {
      alert("CRITICAL ERROR: Access denied to core engine.");
    }
  };

  const terminate = () => {
    SessionManager.terminateSession();
    navigate("/");
  };

  if (clearance !== "ADMIN") return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--noir-dark)' }}>
      <Navbar className="nav-monolith justify-content-between">
        <Navbar.Brand className="title-gold" style={{ fontSize: '1.2rem', color: '#ff4d4d' }}>
           CONTROL SYSTEM: ROOT
        </Navbar.Brand>
        <Nav className="align-items-center">
          <Typography variant="body2" sx={{ color: 'var(--text-dim)', mr: 3 }}>
            OPERATOR: <span style={{ color: 'var(--text-platinum)' }}>{identity}</span>
          </Typography>
          <button className="btn-ghost btn-sm" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={terminate}>Kill Session</button>
        </Nav>
      </Navbar>

      <Container className="mt-5">
        <Fade in timeout={1200}>
          <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            <div className="monolith-card" style={{ borderTop: '4px solid #ff4d4d' }}>
              <Box className="d-flex align-items-center mb-5">
                <GppGoodIcon sx={{ fontSize: 70, color: '#ff4d4d', mr: 3 }} />
                <Box>
                  <Typography variant="h4" className="title-gold" style={{ color: 'white' }}>Super User Hub</Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Universal System Permissions Granted
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ p: 4, background: 'rgba(255, 77, 77, 0.03)', border: '1px solid rgba(255, 77, 77, 0.1)' }}>
                    <Typography variant="h6" className="mb-3" sx={{ color: '#ff4d4d' }}>System Core Access</Typography>
                    <Typography variant="body1" sx={{ color: 'var(--text-dim)', mb: 4, lineHeight: 1.8 }}>
                      You are currently operating within the project's root domain. This interface provides direct hooks into the administrative API endpoints and user-level data streams.
                    </Typography>
                    <div className="d-flex gap-3">
                      <button className="btn-action" style={{ background: 'linear-gradient(135deg, #ff4d4d 0%, #a30000 100%)' }} onClick={accessCoreEngine}>
                        Trigger Core Scan
                      </button>
                      <button className="btn-ghost" onClick={() => navigate("/terminal/user")}>
                        Mirror User View
                      </button>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: 0, border: '1px solid var(--border-subtle)', height: '100%' }}>
                    <Box className="text-center">
                      <MemoryIcon sx={{ fontSize: 50, color: '#ff4d4d', mb: 2 }} />
                      <Typography variant="subtitle1" className="fw-bold mb-3">Monitor Relay</Typography>
                      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 3 }} />
                      <Typography variant="caption" display="block" sx={{ color: 'var(--text-dim)', textAlign: 'left', mb: 1 }}>
                        Uptime: 2,492 Hours
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ color: 'var(--text-dim)', textAlign: 'left', mb: 1 }}>
                        Active Nodes: 12
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ color: 'var(--text-dim)', textAlign: 'left' }}>
                        Memory State: Stable
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default SuperUserHub;
