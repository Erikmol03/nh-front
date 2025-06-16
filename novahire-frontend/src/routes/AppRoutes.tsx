import { Route, Routes } from "react-router-dom";
import Collaborators from "../components/pages/Collaborators";
import LoginPage from "../components/pages/LoginPage";
import HomePage from "../components/pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route
        path="/collaborators"
        element={<Collaborators></Collaborators>}
      ></Route>
      <Route path="/home" element={<HomePage></HomePage>}></Route>
    </Routes>
  );
};

export default AppRoutes;
