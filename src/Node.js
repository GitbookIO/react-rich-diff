const React = require('react');
const NodeWrapper = require('./NodeWrapper');

/**
 * Render an entire slate node and its children.
 * @type {React}
 */
const Node = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render() {
        const { node } = this.props;

        if (node.kind == 'character') {
            return <span>{node.text}</span>;
        } else if (node.kind == 'text') {
            return (
                <span>
                    {node.characters.map((c, i) => <Node key={i} node={c} />)}
                </span>
            );
        } else {
            return (
                <NodeWrapper node={node}>
                    {node.nodes.map(c => <Node key={c.key} node={c} />)}
                </NodeWrapper>
            );
        }
    }
});

module.exports = Node;
