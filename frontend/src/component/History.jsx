import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);


  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      console.log(res.data);

      setHistory(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchHistory();

  }, []);


  return (
    <div className="history-container">

      <h2>Transcription History</h2>

      {
        history.map((item) => (

          <div
            key={item._id}
            className="history-card"
          >

            <h4>{item.fileName}</h4>

            <p>{item.transcriptText}</p>

          </div>
        ))
      }

    </div>
  );
}

export default History;