const React = require('react');

const { TYPES } = require('./diff');
const diffNodes = require('./diffNodes');
const Node = require('./Node');
const PureNode = require('./PureNode');

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
        console.log('ChangeNode', change);
        const { type, original, modified } = change;

        if (type == TYPES.IDENTICAL) {
            return <PureNode node={original} />;
        }

        else if (type == TYPES.MODIFIED) {
            if (original.kind == 'text') {
                return (
                    <ChangeNodes
                        Wrapper={props => <Node node={original}>{props.children}</Node>}
                        original={original.characters}
                        modified={modified.characters}
                        />
                );
            } else if (original.kind == 'character') {
                return (
                    <span>{modified.text} <del>{original.text}</del></span>
                );
            } else {
                return (
                    <ChangeNodes
                        Wrapper={props => <Node node={original}>{props.children}</Node>}
                        original={original.nodes}
                        modified={modified.nodes}
                        />
                );
            }
        }

        else {
            const base = type == TYPES.ADDED ? modified : original;

            if (base.kind == 'character') {
                return (
                    <ChangeWrapper type={type} kind={base.kind}>
                        {base.text}
                    </ChangeWrapper>
                );
            }


            return (
                <ChangeWrapper type={type} kind={base.kind}>
                    <Node node={base}>
                        {(base.nodes || base.characters).map(node => <Node key={node} node={node} />)}
                    </Node>
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

        console.log('ChangeNodes', original, modified);
        const changes = diffNodes(original, modified);

        const children = changes.map(c => <ChangeNode key={c} change={c} />);

        return (
             <Wrapper>
                 {children}
             </Wrapper>
        );
    }
});

module.exports = ChangeNodes;
