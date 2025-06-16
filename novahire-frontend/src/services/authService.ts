import { axiosInstance } from "./axiosConfig";

export const authService = async () => {
  const response = await axiosInstance.get("/auth");
  const token = response.data.token;
  localStorage.setItem("token", token);
};
