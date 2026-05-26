import Audio from "../models/audioModel.js";


export const getHistory = async (req, res) => {

  try {

    const audios = await Audio.find()
      .sort({ createdAt: -1 });

    res.status(200).json(audios);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching history",
    });
  }
};