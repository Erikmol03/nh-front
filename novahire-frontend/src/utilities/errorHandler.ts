import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (error && typeof error === "object") {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const message =
          (axiosError.response.data as any)?.message || "Error del servidor";

        return `Error ${status}: ${message}`;
      }

      return axiosError.message || "Error desconocido de red";
    }

    if ("message" in error) {
      return (error as { message: string }).message;
    }
  }

  return "Error inesperado";
};
