import * as Tone from "tone";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import * as box from "./sketches/box";
import * as plane from "./sketches/plane";
import * as synth from "./sketches/synth";
import * as torus from "./sketches/torus";
import { ReactP5Wrapper } from "../src/index.tsx";
import "./example.css";

function App() {
  const sketches = useMemo(
    () => [box.sketch, torus.sketch, plane.sketch, synth.sketch],
    [box, torus, plane, synth]
  );
  const [state, setState] = useState({
    rotation: 160,
    sketch: box.sketch,
    unmount: false
  });
  const [isDeepCompareEnabled, setIsDeepCompareEnabled] = useState(false);
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
    [box, plane, torus, synth]
  );

  if (state.unmount) {
    return (
      <Fragment>
        <p>Unmounted the sketch</p>
        <button onClick={onMountStateChange}>Remount</button>
      </Fragment>
    );
  }
  const synth1 = useMemo(
    () =>
      new Tone.Synth({
        oscillator: {
          type: "sine"
        }
      }).toDestination(),
    []
  );
  const gain = useMemo(() => new Tone.Gain(0.5).toDestination(), []);
  const synth2 = useMemo(() => new Tone.Synth().connect(gain), []);
  const [currentSynth, setCurrentSynth] = useState(synth1);

  return (
    <Fragment>
      <ReactP5Wrapper
        sketch={state.sketch}
        rotation={state.rotation}
        deepCompareObjectsOnPropsDiff={isDeepCompareEnabled}
        synth={currentSynth}
      />
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
      {state.sketch === synth.sketch ? (
        <div style={{ paddingTop: "10px" }}>
          <button onClick={() => setCurrentSynth(synth1)}>Synth 1</button>
          <button onClick={() => setCurrentSynth(synth2)}>Synth 2</button>
          <button onClick={() => setIsDeepCompareEnabled(prev => !prev)}>
            {isDeepCompareEnabled ? "Disable" : "Enable"} deepCompare
          </button>
        </div>
      ) : null}
    </Fragment>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
