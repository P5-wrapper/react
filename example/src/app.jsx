import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import P5Wrapper from "../../src";
import sketch from "./sketches/sketch";
import sketch2 from "./sketches/sketch2";
import css from "./example.css";
import image from './test.jpg';

function App(props) {
	const [state, setState] = useState({ rotation: 160, sketch, showImage: false });

	return (
		<Fragment>
			<P5Wrapper {...state} image={state.showImage ? image : null} />
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
					sketch: state.sketch === sketch ? sketch2 : sketch,
					showImage: false
				})
			}>Change Sketch</button>
			<button onClick={
				event => setState({
					...state,
					showImage: !state.showImage
				})
			}>Show Image</button>
		</Fragment>
	);
}

render(<App />, document.getElementById("app"));
