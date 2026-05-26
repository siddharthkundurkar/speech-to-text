import AudioUpload from "./component/AudioUpload";
import History from "./component/History";
function App() {

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1>Speech To Text App</h1>

      <AudioUpload />
      <History />
    </div>
  );
}

export default App;