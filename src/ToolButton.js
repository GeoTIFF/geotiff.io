let React = require('react');

class ToolButton extends React.Component {

	constructor(props) {
		super(props);
		this.on_select = this.on_select.bind(this);
	}

	on_select() {
		this.props.on_select(this.props.component);
	}

	render() {
		return (
			<button className='tool-button' onClick={this.on_select}>
				<i className='material-icons'>{this.props.icon}</i>
				<h3>{this.props.name}</h3>
			</button>
		)
	}
}

module.exports = ToolButton;