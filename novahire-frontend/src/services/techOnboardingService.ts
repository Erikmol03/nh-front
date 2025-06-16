import { axiosInstance } from "./axiosConfig";
import { ITechnicalOnboardingAttributes } from "../interfaces/ITechnicalOnboarding";

export const getTypeTechOnboarding = async () => {
  try {
    const getType = await axiosInstance.get("/tech-onboarding/get");
    return getType.data;
  } catch (error) {
    console.error("Error al obtener tipo de tech onboarding ", error);
  }
};
