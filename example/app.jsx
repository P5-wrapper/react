import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import { ReactP5Wrapper } from "../src/index.tsx";
import sketch from "./sketches/sketch";
import sketch2 from "./sketches/sketch2";
import "./example.css";

function App() {
  const [state, setState] = useState({ rotation: 160, sketch });

  return (
    <Fragment>
      <ReactP5Wrapper sketch={state.sketch} rotation={state.rotation} />
      <input
        type="range"
        defaultValue={state.rotation}
        min="0"
        max="360"
        step="1"
        onChange={(event) =>
          setState({ ...state, rotation: parseInt(event.target.value, 10) })
        }
      />
      <button
        onClick={() =>
          setState({
            ...state,
            sketch: state.sketch === sketch ? sketch2 : sketch
          })
        }
      >
        Change Sketch
      </button>
    </Fragment>
  );
}

render(<App />, document.getElementById("app"));
