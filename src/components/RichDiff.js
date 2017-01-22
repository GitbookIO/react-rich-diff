const React = require('react');
const Changes = require('./Changes');

/**
 * Render an entire diff from a state.
 * @type {React}
 */
const RichDiff = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        state:     React.PropTypes.object.isRequired,
        minToWrap: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            className: '',
            minToWrap: 2
        };
    },

    render() {
        const { state, className, minToWrap } = this.props;

        return (
            <Changes
                Wrapper={props => <div className={'RichDiff ' + className}>{props.children}</div>}
                changes={state.changes}
                minToWrap={minToWrap}
            />
        );
    }
});

module.exports = RichDiff;
