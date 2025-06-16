import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OnboardingCalendarPage = () => {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const preloadEvents = [
      {
        title: "Journey to Cloud",
        start: "2025-07-08",
        end: "2025-07-12",
        color: "#6a1b9a",
      },
      {
        title: "Frontend Chapter Onboarding",
        start: "2025-08-05",
        end: "2025-08-10",
        color: "#0288d1",
      },
      {
        title: "Backend Chapter Onboarding",
        start: "2025-09-15",
        end: "2025-09-20",
        color: "#43a047",
      },
    ];
    setEvents(preloadEvents);
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
