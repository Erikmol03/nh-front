🧠 NovaHire · Plataforma de Gestión de Onboardings Técnicos

NovaHire es una plataforma desarrollada para gestionar y visualizar el proceso de onboarding técnico de colaboradores en una organización, centralizando fechas clave, registros e información útil para equipos técnicos y de talento humano.
⚙️ Arquitectura General

    Frontend (React + Vite) desplegado en AWS S3 + CloudFront como hosting de contenido estático.

    Backend (Node.js + Express) expuesto a través de EC2, conectado a una base de datos MySQL RDS.

    Comunicación RESTful mediante Axios desde el frontend al backend.

    Separación de capas: Controladores, Servicios, Modelos.

    Autenticación básica con validación de correo.

🧩 Patrones y Buenas Prácticas

    Patrón MVC (Model - View - Controller)

    Uso de Service Layer Pattern para desacoplar lógica del negocio.

    Buenas prácticas de:

        Validación de datos

        Manejo de errores centralizado

        Organización modular del código

        Código limpio, legible y comentado

    Uso de TypeScript en el frontend para mejorar seguridad y escalabilidad.

    Integración con FullCalendar para visualización de eventos.

🛠️ Tecnologías Utilizadas
Backend:

    Node.js

    Express.js

    Sequelize ORM

    MySQL (RDS)

    Jest para pruebas

    AWS EC2

Frontend:

    React + Vite

    Material UI

    FullCalendar

    Axios

    AWS S3 + CloudFront

🚀 Funcionalidades Principales

    📆 Calendario técnico: visualización anual de fechas clave de onboardings por capítulo (Frontend, Backend, etc).

    👤 Gestión de colaboradores:

        Registro con asignación de tipo de onboarding técnico

        Visualización de su fecha de ingreso y progreso en el onboarding

    🧠 Módulo de onboardings técnicos:

        CRUD de tipos de onboarding técnico

        Relación con múltiples colaboradores

    🔐 Inicio de sesión con autenticación básica (por ahora, sin tokens)

📈 Mejoras a Futuro

    ✅ Migración a HTTPS completo (backend + frontend con certificados SSL)

    🔒 Autenticación robusta con JWT y roles

    📬 Notificaciones por correo al asignar onboardings

    🏢 Panel administrativo completo con filtros, búsqueda y estadísticas

    🧪 Mayor cobertura de pruebas automatizadas (unitarias y de integración)

    📊 Dashboard con métricas visuales

    🌍 Internacionalización (i18n)

    🐳 Dockerización para despliegue más controlado
