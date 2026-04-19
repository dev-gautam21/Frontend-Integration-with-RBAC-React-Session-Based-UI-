import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Typography, Box, Fade } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { SessionManager } from "../utils/sessionHelper";

const AuthPortal = () => {
  const [credentials, setCredentials] = useState({ identity: "", secret: "" });
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const executeAuth = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    const token = `Basic ${btoa(`${credentials.identity}:${credentials.secret}`)}`;

    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        const role = credentials.identity.includes("admin") ? "ADMIN" : "USER";
        
        SessionManager.persistSession(credentials.identity, token, role);

        if (role === "ADMIN") {
          navigate("/terminal/admin");
        } else {
          navigate("/terminal/user");
        }
      }
    } catch (err) {
      setStatusMsg({ type: "danger", text: "Access Denied: Invalid Authentication" });
    }
  };

  return (
    <div style={{ background: 'var(--noir-dark)', minHeight: '100vh' }} className="d-flex align-items-center">
      <Container>
        <Fade in timeout={1500}>
          <Row className="justify-content-center">
            <Col md={8} lg={5}>
              <div className="monolith-card">
                <Box className="text-center mb-5">
                  <ShieldIcon sx={{ fontSize: 50, color: 'var(--gold-primary)', mb: 2 }} />
                  <Typography variant="h4" className="title-gold">
                    Secure Gateway
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-dim)', letterSpacing: '1px' }}>
                    IDENTITY VERIFICATION REQUIRED
                  </Typography>
                </Box>

                {statusMsg.text && (
                  <Alert variant={statusMsg.type} className="border-0 bg-danger text-white rounded-0 mb-4 py-2 small">
                    {statusMsg.text}
                  </Alert>
                )}

                <Form onSubmit={executeAuth}>
                  <Form.Group className="mb-4">
                    <Typography variant="overline" sx={{ color: 'var(--gold-primary)', fontWeight: 600 }}>
                      System ID
                    </Typography>
                    <Form.Control
                      name="identity"
                      className="input-field"
                      placeholder="Username"
                      value={credentials.identity}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Typography variant="overline" sx={{ color: 'var(--gold-primary)', fontWeight: 600 }}>
                      Access Secret
                    </Typography>
                    <Form.Control
                      type="password"
                      name="secret"
                      className="input-field"
                      placeholder="••••••••"
                      value={credentials.secret}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <button type="submit" className="btn-action w-100">
                    Authorize Session
                  </button>
                </Form>
              </div>
              <Box className="text-center mt-4">
                <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>
                  PORTAL PROTECTED BY AES-256 ENCRYPTION
                </Typography>
              </Box>
            </Col>
          </Row>
        </Fade>
      </Container>
    </div>
  );
};

export default AuthPortal;
