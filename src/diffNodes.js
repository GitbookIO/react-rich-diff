const Immutable = require('immutable');
const diff = require('./diff');

function isVariant(a, b) {
    if (a.kind != b.kind) {
        return false;
    }

    // For characters, we do something different
    if (a.kind == 'character') {
        return isCharacterEqual(a, b);
    }

    return (a.type == b.type);
}

function isNodeEqual(a, b) {
    if (!Immutable.is(a.data, b.data)) {
        return false;
    }

    if (a.nodes.size != b.nodes.size) {
        return false;
    }

    return a.nodes.every((aN, i) => {
        const bN = b.nodes.get(i);
        return isEqual(aN, bN);
    });
}

function isTextEqual(a, b) {
    return Immutable.is(a.characters, b.characters);
}

function isRangeEqual(a, b) {
    return Immutable.is(a, b);
}

function isCharacterEqual(a, b) {
    return Immutable.is(a, b);
}

function isEqual(a, b) {
    if (!isVariant(a, b)) return false;

    if (a.kind == 'text') {
        return isTextEqual(a, b);
    } else if (a.kind == 'range') {
        return isRangeEqual(a, b);
    } else if (a.kind == 'character') {
        return isCharacterEqual(a, b);
    } else {
        return isNodeEqual(a, b);
    }
}

/**
 * Calcul diff between lists of nodes
 * @param  {List<Node>} original
 * @param  {List<Node>} modified
 * @return {List<Change>} changes
 */
function diffNodes(original, modified) {
    return diff(original, modified, isVariant, isEqual);
}

module.exports = diffNodes;
