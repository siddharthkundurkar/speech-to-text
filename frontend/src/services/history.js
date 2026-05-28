import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });
export const fetchHistoryApi = async () => {
  const response = await API.get("/history");
  return response.data;
};
