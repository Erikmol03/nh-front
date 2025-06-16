import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage";
import HomePage from "../components/pages/HomePage";
import CreationPage from "../components/pages/CreationPage";
import UpdatePage from "../components/pages/UpdatePage";
import OnboardingCalendarPage from "../components/pages/OnboardingCalendarPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/home" element={<HomePage></HomePage>}></Route>
      <Route
        path="/creation-collaborator"
        element={<CreationPage></CreationPage>}
      ></Route>
      <Route
        path="/update-collaborator/:id"
        element={<UpdatePage></UpdatePage>}
      ></Route>
      <Route
        path="/onboarding-calendar"
        element={<OnboardingCalendarPage></OnboardingCalendarPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
