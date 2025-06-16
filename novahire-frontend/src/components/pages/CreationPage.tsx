import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCollaborator } from "../../services/collaboratorService";
import { getTypeTechOnboarding } from "../../services/techOnboardingService";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  date_entry: Dayjs | null;
  type_technical_onboarding: string;
  date_technical_onboarding: Dayjs | null;
}

const CreationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    date_entry: null,
    type_technical_onboarding: "",
    date_technical_onboarding: null,
  });

  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const fetchedTypes = await getTypeTechOnboarding();
      setTypes(fetchedTypes || []);
    };
    fetchTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const {
      first_name,
      last_name,
      email,
      date_entry,
      type_technical_onboarding,
    } = form;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !date_entry ||
      !type_technical_onboarding
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const newCollaborator = {
      id_collaborator: 0,
      id_onboarding: 0,
      first_name,
      last_name,
      email,
      date_entry: date_entry.toDate(),
      state_welcome_onboarding: false,
      state_technical_onboarding: false,
      type_technical_onboarding,
      date_technical_onboarding: form.date_technical_onboarding
        ? form.date_technical_onboarding.toDate()
        : undefined,
    };

    await createCollaborator(newCollaborator);
    navigate("/home");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Creación de Colaborador
        </Typography>

        <Card sx={{ width: 600, backgroundColor: "#fff", borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              <Box display="flex" gap={2}>
                <TextField
                  label="Nombre"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Apellido"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>

              <TextField
                label="Correo Electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />

              <DatePicker
                label="Fecha de Ingreso"
                value={form.date_entry}
                onChange={(value) => setForm({ ...form, date_entry: value })}
              />

              <TextField
                select
                label="Tipo de Onboarding Técnico"
                name="type_technical_onboarding"
                value={form.type_technical_onboarding}
                onChange={handleChange}
                fullWidth
                required
              >
                {types.map((type, idx) => (
                  <MenuItem key={idx} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <DatePicker
                label="Fecha del Onboarding Técnico (opcional)"
                value={form.date_technical_onboarding}
                onChange={(value) =>
                  setForm({ ...form, date_technical_onboarding: value })
                }
              />
            </Stack>
          </CardContent>

          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Crear
            </Button>
            <Button variant="outlined" onClick={() => navigate("/home")}>
              Volver
            </Button>
          </Box>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default CreationPage;
