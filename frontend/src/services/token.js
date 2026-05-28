import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Get Realtime Token
export const getRealtimeToken = () => {

  return API.get("/token");
};