import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// Get Realtime Token
export const getRealtimeToken = () => {

  return API.get("/token");
};