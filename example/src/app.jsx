import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import P5Wrapper from "../../src";
import sketch from "./sketch";
import css from "./example.css";

function App(props) {
	const [state, setState] = useState({ rotation: 160 });

	return (
		<Fragment>
			<P5Wrapper sketch={sketch({ ...state })} />
			<input
				type="range"
				defaultValue={state.rotation}
				min="0"
				max="360"
				step="1"
				onChange={event => setState({ ...state, rotation: event.target.value })}
			/>
		</Fragment>
	);
}

render(<App />, document.getElementById("app"));
