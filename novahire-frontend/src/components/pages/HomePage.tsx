import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getAllCollaborators,
  deleteCollaborator,
  updateCollaborator,
} from "../../services/collaboratorService";
import { CollaboratorViewAttributes } from "../../interfaces/ICollaboratorView";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState<
    CollaboratorViewAttributes[]
  >([]);

  const fetchData = async () => {
    const data = await getAllCollaborators();
    setCollaborators(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCollaborator(id);
    fetchData();
  };

  const handleToggleWelcome = async (id: number, currentState: boolean) => {
    await updateCollaborator(id, { state_welcome_onboarding: !currentState });
    fetchData();
  };

  const handleToggleTechnical = async (id: number, currentState: boolean) => {
    await updateCollaborator(id, { state_technical_onboarding: !currentState });
    fetchData();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        NovaHire - Panel de Colaboradores
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4, color: "text.secondary" }}>
        <Table sx={{ color: "text.secondary" }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Fecha de Ingreso</TableCell>
              <TableCell>Onboarding de Bienvenida</TableCell>
              <TableCell>Onboarding Técnico</TableCell>
              <TableCell>Tipo Técnico</TableCell>
              <TableCell>Fecha Onboarding Técnico</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collaborators.map((colab) => (
              <TableRow key={colab.id_collaborator}>
                <TableCell>{colab.first_name}</TableCell>
                <TableCell>{colab.last_name}</TableCell>
                <TableCell>{colab.email}</TableCell>
                <TableCell>
                  {new Date(colab.date_entry).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={colab.state_welcome_onboarding}
                    onChange={() =>
                      handleToggleWelcome(
                        colab.id_collaborator!,
                        colab.state_welcome_onboarding
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={colab.state_technical_onboarding}
                    onChange={() =>
                      handleToggleTechnical(
                        colab.id_collaborator!,
                        colab.state_technical_onboarding
                      )
                    }
                  />
                </TableCell>
                <TableCell>{colab.type_technical_onboarding}</TableCell>
                <TableCell>
                  {colab.date_technical_onboarding
                    ? new Date(
                        colab.date_technical_onboarding
                      ).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(colab.id_collaborator!)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" gap={4} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/creation-collaborator")}
        >
          Crear Colaborador
        </Button>
        <Button variant="outlined" color="secondary">
          Calendario de Onboarding
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
