import { api } from "@/lib/api";
import { ApiException } from "../../ApiException";


const getCsv = async (): Promise<string> => {
  try {
    const response = await api.get<string>(`/csv`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new ApiException('Erro ao consultar os documentos do formulário');
  }
};

export const CsvService = {
  getCsv
};
