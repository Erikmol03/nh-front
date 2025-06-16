import { Route, Routes } from "react-router-dom";
import Collaborators from "../components/pages/Collaborators";
import LoginPage from "../components/pages/LoginPage";
import HomePage from "../components/pages/HomePage";
import CreationPage from "../components/pages/CreationPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route
        path="/collaborators"
        element={<Collaborators></Collaborators>}
      ></Route>
      <Route path="/home" element={<HomePage></HomePage>}></Route>
      <Route
        path="/creation-collaborator"
        element={<CreationPage></CreationPage>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
