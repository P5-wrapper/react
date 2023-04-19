import React, { Fragment, useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import * as box from "./sketches/box";
import * as plane from "./sketches/plane";
import * as torus from "./sketches/torus";
import { ReactP5Wrapper } from "../src/main.tsx";
import "./demo.css";

function App() {
  const sketches = useMemo(
    () => [box.sketch, torus.sketch, plane.sketch],
    [box, torus, plane]
  );
  const [state, setState] = useState({
    rotation: 160,
    sketch: box.sketch,
    unmount: false
  });
  const onChangeSketch = useCallback(() => {
    setState(state => {
      const currentSketchIndex = sketches.findIndex(sketch => {
        return Object.is(sketch, state.sketch);
      });
      const nextSketchIndex = (currentSketchIndex + 1) % sketches.length;
      const sketch = sketches.at(nextSketchIndex);

      if (sketch === undefined) {
        return state;
      }

      return { ...state, sketch };
    });
  }, [sketches]);
  const onMountStateChange = useCallback(() => {
    setState(state => ({ ...state, unmount: !state.unmount }));
  }, []);
  const onRotationChange = useCallback(
    event => {
      setState(state => ({
        ...state,
        rotation: parseInt(event.target.value, 10)
      }));
    },
    [box, plane, torus]
  );

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
        onChange={onRotationChange}
      />
      <button onClick={onChangeSketch}>Change Sketch</button>
      <button onClick={onMountStateChange}>Unmount</button>
    </Fragment>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
