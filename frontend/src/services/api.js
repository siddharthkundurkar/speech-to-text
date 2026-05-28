import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Get History
export const getHistory = () => {
  return API.get("/history");
};