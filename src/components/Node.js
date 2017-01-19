const React = require('react');
const NodeWrapper = require('./NodeWrapper');
const TextRange = require('./TextRange');

/**
 * Render an entire slate node and its children.
 * @type {React}
 */
const Node = React.createClass({
    propTypes: {
        node:       React.PropTypes.object.isRequired,
        attributes: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            attributes: {}
        };
    },

    render() {
        const { node, attributes } = this.props;

        if (node.kind == 'range') {
            return (
                <TextRange attributes={attributes} range={node} />
            );
        } else if (node.kind == 'text') {
            return (
                <NodeWrapper attributes={attributes} node={node}>
                    {node.getRanges().map((c, i) => <Node key={i} node={c} />)}
                </NodeWrapper>
            );
        } else {
            return (
                <NodeWrapper attributes={attributes} node={node}>
                    {node.nodes.map(c => <Node key={c.key} node={c} />)}
                </NodeWrapper>
            );
        }
    }
});

module.exports = Node;
