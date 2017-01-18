const React = require('react');

const { TYPES } = require('./diff');
const diffNodes = require('./diffNodes');
const NodeWrapper = require('./NodeWrapper');
const Node = require('./Node');

const ChangeWrapper = React.createClass({
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

/**
 * @type {React}
 */
const ChangeNode = React.createClass({
    propTypes: {
        change: React.PropTypes.object.isRequired
    },

    render() {
        const { change } = this.props;
        const { type, original, modified } = change;

        if (type == TYPES.IDENTICAL) {
            return <Node node={original} />;
        }

        else if (type == TYPES.MODIFIED) {
            if (original.kind == 'text') {
                return (
                    <ChangeNodes
                        Wrapper={props => <span>{props.children}</span>}
                        original={original.characters}
                        modified={modified.characters}
                        />
                );
            } else {
                return (
                    <ChangeNodes
                        Wrapper={props => <NodeWrapper node={original}>{props.children}</NodeWrapper>}
                        original={original.nodes}
                        modified={modified.nodes}
                        />
                );
            }
        }

        else {
            const base = type == TYPES.ADDED ? modified : original;

            return (
                <ChangeWrapper type={type} kind={base.kind}>
                    <Node node={base} />
                </ChangeWrapper>
            );
        }
    }
});

/**
 * @type {React}
 */
const ChangeNodes = React.createClass({
    propTypes: {
        original: React.PropTypes.object.isRequired,
        modified: React.PropTypes.object.isRequired,
        Wrapper:  React.PropTypes.func
    },

    render() {
        const { Wrapper, original, modified } = this.props;
        const changes = diffNodes(original, modified);

        const children = changes.map(c => <ChangeNode key={c.key} change={c} />);

        return (
             <Wrapper>
                 {children}
             </Wrapper>
        );
    }
});

module.exports = ChangeNodes;
