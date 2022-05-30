import React, { Fragment, useState, useCallback } from "react";
import { render } from "react-dom";
import { ReactP5Wrapper } from "../src/index.tsx";
import * as box from "./sketches/box";
import * as torus from "./sketches/torus";
import "./example.css";

function App() {
  const [state, setState] = useState({
    rotation: 160,
    sketch: box.sketch,
    unmount: false
  });
  const onChangeSketch = useCallback(() => {
    const useTorus = state.sketch === box.sketch;
    const sketch = useTorus ? torus.sketch : box.sketch;

    setState(state => ({ ...state, sketch }));
  }, [state.sketch, box.sketch, torus.sketch]);
  const onChangeRotation = useCallback(event => {
    setState(state => ({
      ...state,
      rotation: parseInt(event.target.value, 10)
    }));
  }, []);
  const onMountStateChange = useCallback(() => {
    setState(state => ({ ...state, unmount: !state.unmount }));
  }, []);

  if (state.unmount) {
    return (
      <Fragment>
        <p>Unmounted the sketch</p>
        <button onClick={onMountStateChange}>Remount</button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ReactP5Wrapper sketch={state.sketch} rotation={state.rotation} />
      <input
        type="range"
        defaultValue={state.rotation}
        min="0"
        max="360"
        step="1"
        onChange={onChangeRotation}
      />
      <button onClick={onChangeSketch}>Change Sketch</button>
      <button onClick={onMountStateChange}>Unmount</button>
    </Fragment>
  );
}

render(<App />, document.getElementById("app"));
