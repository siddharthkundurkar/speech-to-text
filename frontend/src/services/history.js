import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
export const fetchHistoryApi = async () => {
  const response = await API.get("/history");
  return response.data;
};
