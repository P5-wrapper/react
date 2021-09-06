import React, { useState } from "react";
import { render } from "react-dom";
import { ReactP5Wrapper } from "../src/index.tsx";
import * as box from "./sketches/box";
import * as torus from "./sketches/torus";
import "./example.css";

function App() {
  const [state, setState] = useState({ rotation: 160, sketch: box.sketch });

  return (
    <>
      <ReactP5Wrapper sketch={state.sketch} rotation={state.rotation} />
      <input
        type="range"
        defaultValue={state.rotation}
        min="0"
        max="360"
        step="1"
        onChange={event => {
          setState({
            ...state,
            rotation: parseInt(event.target.value, 10)
          });
        }}
      />
      <button
        onClick={() => {
          const useTorus = state.sketch === box.sketch;
          setState({
            ...state,
            sketch: useTorus ? torus.sketch : box.sketch
          });
        }}
      >
        Change Sketch
      </button>
    </>
  );
}

render(<App />, document.getElementById("app"));
