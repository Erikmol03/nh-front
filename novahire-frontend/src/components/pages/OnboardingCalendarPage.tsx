import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTypeTechOnboarding } from "../../services/techOnboardingService"; // Ajusta la ruta si es necesario

const OnboardingCalendarPage = () => {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getTypeTechOnboarding();

        if (Array.isArray(data)) {
          const formattedEvents = data.map((item) => ({
            title: item.type_technical_onboarding,
            start: item.start_date,
            end: item.end_date,
            color: "#6a1b9a", // puedes asignar colores dinámicamente si quieres
          }));

          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error cargando el calendario de onboarding", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box m={4}>
      <Typography variant="h4" mb={2}>
        Calendario de Onboardings Técnicos
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </Box>
  );
};

export default OnboardingCalendarPage;
