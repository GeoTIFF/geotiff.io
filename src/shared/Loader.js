let React = require('react');
var Spinner = require('react-spinkit');

class Loader extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.error("starting Loader.componentWillReceiveProps");
    }

    render() {
        console.error("starting Loader.render with this.props.loading", this.props.loading);
        if (this.props.loading) {
            return (
                <div className="main-loader">
                    <Spinner name='circle' color="#00897B" />
                </div>
            );
        } else {
            return null;
        }
    }
}

module.exports = Loader;
