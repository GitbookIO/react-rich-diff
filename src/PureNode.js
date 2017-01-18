/* eslint-disable react/prop-types */
const React = require('react');

const Node = require('./Node');

/**
 *
 * @type {React}
 */
const PureNode = React.createClass({
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
                    {node.characters.map(c => <PureNode node={c} />)}
                </span>
            );
        } else {
            return (
                <Node node={node}>
                    {node.nodes.map(c => <PureNode node={c} />)}
                </Node>
            );
        }
    }
});

module.exports = PureNode;
