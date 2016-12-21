import React from'react';
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class App extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
		};
	}

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	render () {
		return (
			<div>
				<P5Wrapper sketch={sketch} rotation={this.state.rotation}/>
				<input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange.bind(this)}/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
