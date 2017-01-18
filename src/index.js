const React = require('react');
const ChangeNodes = require('./ChangeNodes');

/**
 * Component to render the rich diff between two documents.
 * @type {ReactClass}
 */
const RichDiff = React.createClass({
    propTypes: {
        original: React.PropTypes.object.isRequired,
        modified: React.PropTypes.object.isRequired
    },

    render() {
        const { original, modified } = this.props;

        console.log(original, modified);

        return (
            <ChangeNodes
                Wrapper={props => <div className="RichDiff">{props.children}</div>}
                original={original.nodes}
                modified={modified.nodes}
                />
        );
    }
});

module.exports = RichDiff;
