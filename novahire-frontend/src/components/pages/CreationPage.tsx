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
import { ITechnicalOnboardingAttributes } from "../../interfaces/ITechnicalOnboarding";
import { FormState } from "../../interfaces/ICollaboratorForm";

const CreationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    id_onboarding: 0,
    first_name: "",
    last_name: "",
    email: "",
    date_entry: null,
    type_technical_onboarding: "",
    date_technical_onboarding: null,
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [types, setTypes] = useState<ITechnicalOnboardingAttributes[]>([]);

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
    const { name, value } = e.target;
    let error = "";

    if (
      (name === "first_name" || name === "last_name") &&
      /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/.test(value)
    ) {
      error = "Solo se permiten letras y espacios";
    }

    if (
      name === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Correo inválido";
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleCreate = async () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
    };

    if (!form.first_name || /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/.test(form.first_name)) {
      newErrors.first_name = "Nombre inválido";
    }

    if (!form.last_name || /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/.test(form.last_name)) {
      newErrors.last_name = "Apellido inválido";
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (hasErrors) return;

    const newCollaborator = {
      id_onboarding: form.id_onboarding ?? 0,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      date_entry: form.date_entry!.toDate(),
      state_welcome_onboarding: false,
      state_technical_onboarding: false,
      type_technical_onboarding: form.type_technical_onboarding,
      date_technical_onboarding: form.date_technical_onboarding?.toDate(),
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

        <Card
          sx={{
            width: 600,
            backgroundColor: "#fff",
            borderRadius: 4,
            color: "text.secondary",
          }}
        >
          <CardContent sx={{ color: "text.secondary" }}>
            <Stack spacing={2}>
              <Box display="flex" gap={2}>
                <TextField
                  label="Nombre"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
                <TextField
                  label="Apellido"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.last_name}
                  helperText={errors.last_name}
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
                error={!!errors.email}
                helperText={errors.email}
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
                onChange={(e) => {
                  const selectedType = types.find(
                    (type) => type.type_technical_onboarding === e.target.value
                  );
                  setForm({
                    ...form,
                    type_technical_onboarding: e.target.value,
                    id_onboarding: selectedType?.id_onboarding,
                  });
                }}
                fullWidth
                required
              >
                {types.map((type) => (
                  <MenuItem
                    key={type.id_onboarding}
                    value={type.type_technical_onboarding}
                  >
                    {type.type_technical_onboarding}
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
