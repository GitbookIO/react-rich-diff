/* eslint-disable react/prop-types */
const React = require('react');

const schema = require('./schema');

const defaultBlock  = ({ children }) => <div>{children}</div>;
const defaultInline = ({ children }) => <span>{children}</span>;

/**
 * Rendering for a slate node. It doesn't consider children.
 *
 * @type {React}
 */
const NodeWrapper = React.createClass({
    propTypes: {
        node:     React.PropTypes.object.isRequired,
        children: React.PropTypes.node
    },

    render() {
        const { node, children } = this.props;
        const Renderer = schema.nodes[node.type] || (
            node.kind == 'block' ? defaultBlock : defaultInline
        );

        return <Renderer node={node}>{children}</Renderer>;
    }
});

module.exports = NodeWrapper;
