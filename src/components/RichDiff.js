const React = require('react');
const Changes = require('./Changes');

/**
 * Render an entire diff from a state.
 * @type {React}
 */
const RichDiff = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        state:     React.PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            className: ''
        };
    },

    render() {
        const { state, className } = this.props;

        return (<Changes
            Wrapper={props => <div className={'RichDiff ' + className}>{props.children}</div>}
            changes={state.changes}
            />);
    }
});

module.exports = RichDiff;
