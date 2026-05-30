import axios from "axios";


const API =
  import.meta.env
    .VITE_API_URL;


export const uploadAudioApi =
  async (formData) => {

    const res =
      await axios.post(

        `${API}/api/upload`,

        formData
      );

    return res.data;
  };