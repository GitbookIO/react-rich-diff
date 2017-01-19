const Immutable = require('immutable');
const diffTree = require('./diffTree');

/**
 * Diff two tree of nodes. It goes down to the characters.
 *
 * @param  {List<Node>} original
 * @param  {List<Node>} modified
 * @return {List<Change>} changes
 */
function diffNodes(original, modified) {
    return diffTree(
        original, modified,
        isVariant, isEqual, getChildren
    );
}

/**
 * Get children to diff for a node.
 * @param  {Node} node
 * @return {List<Node|Character>}
 */
function getChildren(node) {
    if (node.kind == 'text') {
        return node.characters;
    } else if (node.kind == 'block' || node.kind == 'inline') {
        return node.nodes;
    } else {
        return [];
    }
}

/**
 * Check if two nodes could be variant.
 * @param  {Node}  a
 * @param  {Node}  b
 * @return {Boolean}
 */
function isVariant(a, b) {
    if (a.kind != b.kind) {
        return false;
    }

    // For characters, it's aleays added/removed
    if (a.kind == 'character') {
        return false;
    }

    return (a.type == b.type);
}

/**
 * Check if nodes are equal.
 * @param  {Node}  a
 * @param  {Node}  b
 * @return {Boolean}
 */
function isEqual(a, b) {
    switch (a.kind) {

    case 'inline':
    case 'block':
        return a.type == b.type && Immutable.is(a.data, b.data);

    case 'character':
        return Immutable.is(a, b);

    default:
        throw new Error('Invalid kind for isEqual: ' + a.kind);
    }
}

module.exports = diffNodes;
