const React = require('react');

const TYPES = require('../diffing/TYPES');
const Node = require('./Node');
const NodeWrapper = require('./NodeWrapper');

function classNameForChange(node, change) {
    return `diff-${change.type} diff-${node.kind}-${change.type}`;
}

/**
 * Render a change without changed
 * @type {React}
 */
const IdenticalChange = React.createClass({
    propTypes: {
        change: React.PropTypes.object.isRequired
    },

    render() {
        const { change } = this.props;
        return <Node node={change.original} />;
    }
});

/**
 * Render a change that is being added
 * @type {React}
 */
const AddedRemovedChange = React.createClass({
    propTypes: {
        change: React.PropTypes.object.isRequired
    },

    render() {
        const { change } = this.props;
        const node = change.type == TYPES.ADDED ? change.modified : change.original;
        const attributes = {
            className: classNameForChange(node, change)
        };

        return (
            <Node attributes={attributes} node={node} />
        );
    }
});

/**
 * Render a modification between two nodes.
 * @type {React}
 */
const ModifiedChange = React.createClass({
    propTypes: {
        change: React.PropTypes.object.isRequired
    },

    render() {
        const { change } = this.props;
        const { original, modified } = change;
        const attributes = {
            className: classNameForChange(modified, change)
        };

        return (
            <Changes
                Wrapper={props => (
                    <NodeWrapper
                        node={modified}
                        original={original}
                        attributes={attributes}
                    >{props.children}</NodeWrapper>)}
                changes={change.children}
                />
        );
    }
});

/**
 * Render a change.
 * @type {React}
 */
const Change = React.createClass({
    propTypes: {
        change: React.PropTypes.object.isRequired
    },

    render() {
        const { change } = this.props;

        switch (change.type) {

        case TYPES.IDENTICAL:
            return <IdenticalChange change={change} />;

        case TYPES.MODIFIED:
            return <ModifiedChange change={change} />;

        case TYPES.ADDED:
        case TYPES.REMOVED:
            return <AddedRemovedChange change={change} />;

        }
    }
});

/**
 * Render a list of changes.
 * @type {React}
 */
const Changes = React.createClass({
    propTypes: {
        changes: React.PropTypes.object.isRequired,
        Wrapper:  React.PropTypes.func
    },

    render() {
        const { Wrapper, changes } = this.props;

        return (
             <Wrapper>
                 {changes.map(c => <Change key={c.key} change={c} />)}
             </Wrapper>
        );
    }
});

module.exports = Changes;
