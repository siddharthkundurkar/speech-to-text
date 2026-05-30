import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// Get History
export const getHistory = () => {
  return API.get("/history");
};