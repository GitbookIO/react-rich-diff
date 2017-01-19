const React = require('react');

/**
 * Render an indicator for a change (added, modified, etc) with the right class name.
 * @type {ReactClass}
 */
const ChangeIndicator = React.createClass({
    propTypes: {
        kind:     React.PropTypes.string.isRequired,
        type:     React.PropTypes.string.isRequired,
        children: React.PropTypes.node
    },

    render() {
        const { kind, type, children } = this.props;
        const className = `diff-${kind}-${type}`;

        if (kind == 'block') {
            return <div className={className}>{children}</div>;
        } else {
            return <span className={className}>{children}</span>;
        }
    }
});

module.exports = ChangeIndicator;
