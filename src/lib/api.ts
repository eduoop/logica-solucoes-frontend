// import dotenv from "dotenv";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.defaults.headers.common["Content-Type"] = "application/json";
