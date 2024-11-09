import { api } from "@/lib/api";
import { ApiException } from "../../ApiException";

export interface IAllUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  date_of_birth: string;
  phone_number: string;
}

export interface IPagination {
  itemsPerPage: number;
}

export interface IUsersApiResponse {
  data: IAllUserResponse[]; 
  pagination: IPagination; 
}

const getAllUsers = async (): Promise<IUsersApiResponse> => {
  try {
    const response = await api.get<IUsersApiResponse>(`/users?limit=10`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new ApiException('Erro ao consultar os documentos do formulário');
  }
};

export const UserService = {
  getAllUsers,
};
