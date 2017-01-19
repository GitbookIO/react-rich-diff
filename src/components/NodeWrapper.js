/* eslint-disable react/prop-types */
const React = require('react');
const schema = require('../schema');

/**
 * Rendering for a slate node. It doesn't consider children.
 *
 * @type {React}
 */
const NodeWrapper = React.createClass({
    propTypes: {
        node:       React.PropTypes.object.isRequired,
        attributes: React.PropTypes.object.isRequired,
        original:   React.PropTypes.object,
        children:   React.PropTypes.node
    },

    render() {
        const { node, attributes, original, children } = this.props;

        const Renderer = schema.nodes[node.type] || (
            node.kind == 'block' ? schema.defaultBlock : schema.defaultInline
        );

        return (
            <Renderer node={node} attributes={attributes} original={original}>
                {children}
            </Renderer>
        );
    }
});

module.exports = NodeWrapper;
