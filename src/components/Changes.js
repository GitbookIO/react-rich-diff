const React = require('react');
const { List } = require('immutable');

const TYPES = require('../diffing/TYPES');
const groupChanges = require('../diffing/groupChanges');
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
 * Wrap identitcal changes in a toggable div.
 * @type {React}
 */
const ToggableGroup = React.createClass({
    propTypes: {
        changes: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            visible: false
        };
    },

    onClick() {
        this.setState({
            visible: true
        });
    },

    render() {
        const { changes } = this.props;
        const { visible } = this.state;

        if (!visible) {
            return (
                <div className="RichDiff-ToggableGroup" onClick={this.onClick}>
                    <i className="octicon octicon-unfold"></i>
                </div>
            );
        }

        return (
            <Changes
                changes={changes}
                Wrapper={props => <div>{props.children}</div>}
                />
        );
    }
});

/**
 * Render a list of changes.
 * @type {React}
 */
const Changes = React.createClass({
    propTypes: {
        changes:   React.PropTypes.object.isRequired,
        Wrapper:   React.PropTypes.func,
        minToWrap: React.PropTypes.number
    },

    render() {
        const { Wrapper, changes, minToWrap } = this.props;
        const groups = groupChanges(changes, minToWrap);

        return (
             <Wrapper>
                 {groups.map((change, i) => List.isList(change) ? (
                     <ToggableGroup key={i} changes={change} />
                 ) : (
                     <Change key={change.key} change={change} />
                 ))}
             </Wrapper>
        );
    }
});

module.exports = Changes;
