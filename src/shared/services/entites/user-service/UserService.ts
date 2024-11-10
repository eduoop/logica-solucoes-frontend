import { api } from "@/lib/api";
import { ApiException } from "../../ApiException";
import { User } from "@/models/user.model";

export interface IPagination {
  itemsPerPage: number;
}

export interface IUsersApiResponse {
  data: User[]; 
  pagination: IPagination; 
}

const getAllUsers = async (): Promise<IUsersApiResponse> => {
  try {
    const response = await api.get<IUsersApiResponse>(`/users?limit=20`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new ApiException('Erro ao consultar os documentos do formulário');
  }
};

const saveUsers = async (usersData: User[]) => {
  try {
    await api.post<{ users: User[] }>(`/users`, {
      users: usersData,
    });
  } catch (error) {
    console.log(error)
    throw new ApiException('Erro ao criar um novo usuário');
  }
};

export const UserService = {
  getAllUsers,
  saveUsers
};
