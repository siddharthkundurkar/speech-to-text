import Audio from "../models/audioModel.js";


export const getHistory = async (
  req,
  res
) => {

  try {

    // Fetch History
    const audios =
      await Audio.find()

        .sort({
          createdAt: -1,
        });


    // Empty History
    if (
      audios.length === 0
    ) {

      return res.status(404).json({

        success: false,

        message:
          "No transcription history found",
      });
    }


    // Success Response
    res.status(200).json({

      success: true,

      count: audios.length,

      data: audios,
    });

  } catch (error) {

    console.log(error);


    // Error Response
    res.status(500).json({

      success: false,

      message:
        error.message ||

        "Error fetching history",
    });
  }
};