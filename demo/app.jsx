import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { P5Canvas } from "@/main.tsx";

import "./demo.css";
import { sketch as box } from "./sketches/box";
import { sketch as plane } from "./sketches/plane";
import { sketch as record } from "./sketches/record";
import { sketch as torus } from "./sketches/torus";

const sketches = [box, torus, plane, record];

function App() {
  const [state, setState] = useState({
    rotation: 160,
    sketch: box,
    unmount: false,
  });

  const onChangeSketch = useCallback(() => {
    setState((state) => {
      const currentSketchIndex = sketches.findIndex((sketch) => {
        return Object.is(sketch, state.sketch);
      });
      const nextSketchIndex = (currentSketchIndex + 1) % sketches.length;
      const sketch = sketches.at(nextSketchIndex);

      if (sketch === undefined) {
        return state;
      }

      return { ...state, sketch };
    });
  }, []);

  const onMountStateChange = useCallback(() => {
    setState((state) => ({ ...state, unmount: !state.unmount }));
  }, []);

  const onRotationChange = useCallback((event) => {
    setState((state) => ({
      ...state,
      rotation: parseInt(event.target.value, 10),
    }));
  }, []);

  if (state.unmount) {
    return (
      <>
        <p>Unmounted the sketch</p>
        <button type="button" onClick={onMountStateChange}>
          Remount
        </button>
      </>
    );
  }

  return (
    <>
      <P5Canvas sketch={state.sketch} rotation={state.rotation} />
      {state.sketch === record && (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <button type="button" id="start-recording">
            Start Recording
          </button>
          <button type="button" id="stop-recording">
            Stop Recording
          </button>
          <button type="button" id="pause-recording">
            Pause Recording
          </button>
          <button type="button" id="resume-recording">
            Resume Recording
          </button>
        </div>
      )}
      <input
        type="range"
        defaultValue={state.rotation}
        min="0"
        max="360"
        step="1"
        onChange={onRotationChange}
      />
      <button type="button" onClick={onChangeSketch}>
        Change Sketch
      </button>
      <button type="button" onClick={onMountStateChange}>
        Unmount
      </button>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
