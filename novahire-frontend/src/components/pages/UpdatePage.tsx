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
import { useNavigate, useParams } from "react-router-dom";
import { updateCollaborator } from "../../services/collaboratorService";
import { getTypeTechOnboarding } from "../../services/techOnboardingService";
import { getCollaboratorById } from "../../services/collaboratorService";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITechnicalOnboardingAttributes } from "../../interfaces/ITechnicalOnboarding";
import { FormState } from "../../interfaces/ICollaboratorForm";
import { CollaboratorViewAttributes } from "../../interfaces/ICollaboratorView";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<FormState>({
    id_onboarding: 0,
    first_name: "",
    last_name: "",
    email: "",
    date_entry: null,
    type_technical_onboarding: "",
    date_technical_onboarding: null,
  });
  const [types, setTypes] = useState<ITechnicalOnboardingAttributes[]>([]);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTypes = await getTypeTechOnboarding();
      setTypes(fetchedTypes || []);

      if (id) {
        const data = await getCollaboratorById(Number(id));
        setForm({
          ...data,
          date_entry: dayjs(data.date_entry),
          date_technical_onboarding: data.date_technical_onboarding
            ? dayjs(data.date_technical_onboarding)
            : null,
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let error = "";

    if (
      (name === "first_name" || name === "last_name") &&
      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value)
    ) {
      error = "Solo se permiten letras";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Correo no válido";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.date_entry ||
      errors.first_name ||
      errors.last_name ||
      errors.email
    ) {
      alert("Por favor completa todos los campos obligatorios correctamente.");
      return;
    }

    const updateData: Partial<CollaboratorViewAttributes> = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      date_entry: form.date_entry.toDate(),
      type_technical_onboarding: form.type_technical_onboarding,
      date_technical_onboarding: form.date_technical_onboarding
        ? form.date_technical_onboarding.toDate()
        : undefined,
    };

    await updateCollaborator(Number(id), updateData);
    navigate("/home");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Edición de Colaborador
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
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name}
                />
                <TextField
                  label="Apellido"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name}
                />
              </Box>
              <TextField
                label="Correo Electrónico"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
                error={Boolean(errors.email)}
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
                    id_onboarding: selectedType?.id_onboarding || 0,
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
            <Button variant="contained" onClick={handleUpdate}>
              Actualizar
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

export default EditPage;
