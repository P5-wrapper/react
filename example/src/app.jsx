import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import P5Wrapper from "../../src";
import sketch from "./sketches/sketch";
import sketch2 from "./sketches/sketch2";
import css from "./example.css";

function App(props) {
	const [state, setState] = useState({ rotation: 160, sketch });

	return (
		<Fragment>
			<P5Wrapper sketch={state.sketch} rotation={state.rotation} />
			<input
				type="range"
				defaultValue={state.rotation}
				min="0"
				max="360"
				step="1"
				onChange={event => setState({ ...state, rotation: event.target.value })}
			/>
			<button onClick={
				event => setState({
					...state,
					sketch: state.sketch === sketch ? sketch2 : sketch
				})
			}>Change Sketch</button>
		</Fragment>
	);
}

render(<App />, document.getElementById("app"));
