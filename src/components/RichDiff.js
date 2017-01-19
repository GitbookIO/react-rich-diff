const React = require('react');
const Changes = require('./Changes');

/**
 * Render an entire diff from a state.
 * @type {React}
 */
const RichDiff = React.createClass({
    propTypes: {
        state: React.PropTypes.object.isRequired
    },

    render() {
        const { state } = this.props;
        return <Changes changes={state.changes} />;
    }
});

module.exports = RichDiff;
