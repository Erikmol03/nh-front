import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await authService();
      alert("Token recibido y almacenado");
      navigate("/home");
    } catch (error) {
      console.error("Error en autenticación", error);
      alert("No se ha podido iniciar sesión");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "3rem" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="body1" paragraph>
        Presiona el botón para autenticarte y obtener un token.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Obtener Token
      </Button>
    </Container>
  );
};

export default LoginPage;
