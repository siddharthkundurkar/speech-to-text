import AudioUpload from "./component/AudioUpload";

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

    </div>
  );
}

export default App;