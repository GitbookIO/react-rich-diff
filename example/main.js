const React = require('react');
const ReactDOM = require('react-dom');

const RichDiff = require('../src');

const Example = React.createClass({
    getInitialState() {
        return {
            base: '',
            head: ''
        };
    },

    render() {
        const { value, edition } = this.state;

        return (
            <div>

            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
