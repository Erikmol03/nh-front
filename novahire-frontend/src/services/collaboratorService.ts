import { axiosInstance } from "./axiosConfig";
import { handleAxiosError } from "../utilities/errorHandler";
import { CollaboratorViewAttributes } from "../interfaces/ICollaboratorView";
import { ICollaboratorCreateAttributes } from "../interfaces/ICollaboratorCreateAttributes";
import { toast } from "react-toastify";

export const createCollaborator = async (
  data: ICollaboratorCreateAttributes
) => {
  try {
    const createdCollaborator = await axiosInstance.post(
      "/collaborator/create",
      data
    );
    alert("Colaborador creado exitosamente");
    return createdCollaborator.data;
  } catch (error) {
    const msg = handleAxiosError(error);
    console.error(msg);
    throw new Error(msg);
  }
};

export const updateCollaborator = async (
  id: number,
  updateData: Partial<CollaboratorViewAttributes>
) => {
  try {
    const updatedCollaborator = await axiosInstance.patch(
      `/collaborator/update/${id}`,
      updateData
    );
    alert("Colaborador actualizado exitosamente");
    return updatedCollaborator.data;
  } catch (error) {
    const msg = handleAxiosError(error);
    console.error(msg);
    throw new Error(msg);
  }
};

export const getCollaboratorById = async (id: number) => {
  try {
    const getInfoCollaborator = await axiosInstance.get(
      `/collaborator/find/${id}`
    );
    return getInfoCollaborator.data;
  } catch (error) {
    const msg = handleAxiosError(error);
    console.error(msg);
    throw new Error(msg);
  }
};

export const getAllCollaborators = async () => {
  try {
    const collaborators = await axiosInstance.get("collaborator/data");
    return collaborators.data;
  } catch (error) {
    const msg = handleAxiosError(error);
    console.error(msg);
    throw new Error(msg);
  }
};

export const deleteCollaborator = async (id: number) => {
  try {
    const deletedCollaborator = await axiosInstance.delete(
      `/collaborator/delete/${id}`
    );
    alert("Colaborador eliminado exitosamente");
    return deletedCollaborator.data;
  } catch (error) {
    const msg = handleAxiosError(error);
    console.error(msg);
    throw new Error(msg);
  }
};
