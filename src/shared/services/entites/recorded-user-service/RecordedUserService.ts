import { api } from "@/lib/api";
import { ApiException } from "../../ApiException";
import { User } from "@/models/user.model";

export interface IRecordedUsersApiResponse {
  items: User[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const getAllRecordedUsers = async (
  page: number = 1,
  search: string = ""
): Promise<IRecordedUsersApiResponse> => {
  try {
    const response = await api.get<IRecordedUsersApiResponse>(
      `/recorded-users`,
      {
        params: {
          page,
          limit: 20,
          search,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new ApiException("Erro ao consultar os usuários.");
  }
};

const removeRecordedUsers = async (ids: number[]): Promise<void> => {
  try {
    await api.delete("/recorded-users", {
      data: { ids },
    });
  } catch (error) {
    console.log(error);
    throw new ApiException("Erro ao remover os usuários.");
  }
};

const updateRecordedUser = async (id: number, userData: Omit<User, "id" | "avatar">) => {
  try {
    await api.patch<Omit<User, "id" | "avatar">>(`/recorded-users/${id}`, userData);
  } catch (error) {
    console.log(error);
    throw new ApiException("Erro ao atualizar o usuário.");
  }
};

export const RecordedUserService = {
  getAllRecordedUsers,
  removeRecordedUsers,
  updateRecordedUser
};
