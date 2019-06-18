import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

function tick(){
	const element = (
					 <div>
					 <h1> Hello,World</h1>
					 <h2> 现在是{new Date().toLocaleTimeString()}.</h2>
					 </div>
					);
	ReactDOM.render(
					element,
					document.getElementById('root')
				   );
}
//setInterval(tick, 1000);
function Clock(props){
	return (
		   <div>
			<h1>Hello,World</h1>
			<h2>time{props.date.toLocaleTimeString()}</h2>
			</div>

		   );
}
function tick2(){
	ReactDOM.render(
				  <Clock date={new Date()}/>,
					document.getElementById('root')
				   );
}
class Clock1 extends React.Component{
	render(){
		return (
			   	<div>
				<h1>显示时间</h1>
				<h2>时间:{this.props.date.toLocaleTimeString()}</h2>
			   	</div>
			   );
	}
}
function tick3(){
	ReactDOM.render(
				   <Clock1 date={new Date()}/>,
					document.getElementById('root')
				   );
}
setInterval(tick3, 1000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
