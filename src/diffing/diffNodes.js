const Immutable = require('immutable');
const { BLOCKS } = require('markup-it');

const diffTree = require('./diffTree');
const getRangesFromText = require('./getRangesFromText');

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
        return getRangesFromText(node);
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
    // For characters, it's always added/removed
    if (a.kind == 'range') {
        return isEqual(a, b);
    }

    if (a.kind != b.kind) {
        return false;
    }

    // Void nodes should be rendered as added/remove
    if (a.isVoid) {
        return isEqual(a, b);
    }

    return isTypeEqual(a.type, b.type);
}

/**
 * Check if nodes are equal.
 * @param  {Node}  a
 * @param  {Node}  b
 * @return {Boolean}
 */
function isEqual(a, b) {
    switch (a.kind) {

    // We compare the type and the metadata
    case 'inline':
    case 'block':
        return (
            a.type == b.type &&

            // Not pretty but work for table with "align" being an array instead of a list
            Immutable.is(
                Immutable.fromJS(a.data.toJS()),
                Immutable.fromJS(b.data.toJS())
            )
        );

    // Compare the marks and text
    case 'range':
        return Immutable.is(a, b);

    // For text node, the changes are in the characters
    case 'text':
        return true;

    default:
        throw new Error('Invalid kind for isEqual: ' + a.kind);
    }
}

/**
 * Check if node types are equal.
 * @param  {String} a
 * @param  {String} b
 * @return {Boolean}
 */
function isTypeEqual(a, b) {
    if (isHeading(a) && isHeading(b)) {
        return true;
    }

    if (isList(a) & isList(b)) {
        return true;
    }

    return a == b;
}

/**
 * Check if node type is an heading
 * @param  {String} type
 * @return {Boolean}
 */
function isHeading(type) {
    return [
        BLOCKS.HEADING_1,
        BLOCKS.HEADING_2,
        BLOCKS.HEADING_3,
        BLOCKS.HEADING_4,
        BLOCKS.HEADING_5,
        BLOCKS.HEADING_6
    ].includes(type);
}


/**
 * Check if node type is a list.
 * @param  {String} type
 * @return {Boolean}
 */
function isList(type) {
    return [
        BLOCKS.UL_LIST,
        BLOCKS.OL_LIST
    ].includes(type);
}

module.exports = diffNodes;
