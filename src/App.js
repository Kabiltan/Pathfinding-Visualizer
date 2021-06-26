import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import { useState, useEffect } from "react";
import Popup from "./Popup/Popup";
import FinalPopup from "./Popup/FinalPopupPage";
import Page1 from "./Popup/Page1";
import Page2 from "./Popup/Page2";
import Page3 from "./Popup/Page3";
import Page4 from "./Popup/Page4";

function App() {
  const [timedPopup, setTimedPopup] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

  if(page === 1){
    return (
      <div className="App">
        <Popup trigger={timedPopup} setTrigger={setTimedPopup} setPage={setPage} page={page}>
          <Page1></Page1>
        </Popup>
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
  else if(page === 2){
    return (
      <div className="App">
        <Popup trigger={timedPopup} setTrigger={setTimedPopup} setPage={setPage} page={page}>
          <Page2></Page2>
        </Popup>
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
  else if(page === 3){
    return (
      <div className="App">
        <Popup trigger={timedPopup} setTrigger={setTimedPopup} setPage={setPage} page={page}>
          <Page3></Page3>
        </Popup>
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
  else if(page === 4){
    return (
      <div className="App">
        <FinalPopup trigger={timedPopup} setTrigger={setTimedPopup} setPage={setPage} page={page}>
          <Page4></Page4>
        </FinalPopup>
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
  else if(page === 5){
    return (
      <div className="App">
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    );
  }
}

export default App;
