import { axiosInstance } from "./axiosConfig";
import { CollaboratorAttributes } from "../interfaces/ICollaborator";
import { CollaboratorViewAttributes } from "../interfaces/ICollaboratorView";

export const createCollaborator = async (data: CollaboratorAttributes) => {
  try {
    const createdCollaborator = await axiosInstance.post(
      "/collaborator/create",
      data
    );
    return createdCollaborator.data;
  } catch (error) {
    console.error("Error al crear el colaborador ", error);
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
  } catch (error) {
    console.error("Error al actualizar el colaborador");
  }
};

export const getAllCollaborators = async () => {
  try {
    const collaborators = await axiosInstance.get("collaborator/data");
    return collaborators.data;
  } catch (error) {
    console.error("Error al obtener los colaboradores ", error);
  }
};

export const deleteCollaborator = async (id: number) => {
  try {
    const deletedCollaborator = await axiosInstance.delete(
      `/collaborator/delete/${id}`
    );
    return deletedCollaborator.data;
  } catch (error) {
    console.error("Error al eliminar el colaborador ", error);
  }
};
