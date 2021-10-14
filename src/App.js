import "./App.css";
import DomWater from "./DomWater";
import CanvasWater from "./CanvasWater";
import SvgWater from "./SvgWater";
import PicWater from "./PicWater"


function App() {
  return (
    <div className="App">
      {/* 1. dom元素覆盖 */}
      {/* <DomWater /> */}

      {/* 2. canvas */}
      <CanvasWater />

      {/* 3. svg */}
      {/* <SvgWater /> */}

      {/* 4. 图片 */}
      {/* <PicWater /> */}
    </div>
  );
}

export default App;
