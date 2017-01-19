const { List } = require('immutable');
const Change = require('./Change');

/**
 * Longest common subsequence
 *
 * @param  {Array} xs, ys
 * @param  {Array} head
 * @return {Array}
 */
function lcs(xs, ys, isVariant, iter = 0) {
    if (xs.length == 0 || ys.length == 0) {
        return [];
    }

    const [xFirst, ...xRest] = xs;
    const [yFirst, ...yRest] = ys;

    if (isVariant(xFirst, yFirst)) {
        return [
            {
                original: xFirst,
                modified: yFirst
            }
        ].concat(lcs(xRest, yRest, isVariant, iter + 1));
    }

    const a = lcs(xs, yRest, isVariant, iter + 1);
    const b = lcs(xRest, ys, isVariant, iter + 1);
    return (a.length > b.length) ? a : b;
}

/**
 * Diff two tree of items.
 * @param  {List}  original
 * @param  {List}  modified
 * @param  {Function} isVariant(a, b): Return true if a and b are modifiable items
 * @param  {Function} isEqual(a, b): Return true if a and b are stricly equal
 * @param  {Function} getChildren: Return children of an item
 * @return {List<Change>}
 */
function diffTree(original, modified, isVariant, isEqual, getChildren) {
    original = List(original).toArray();
    modified = List(modified).toArray();
    let subsequence = lcs(original, modified, isVariant);

    const result = [];
    let sfirst, mfirst, ofirst;

    while (subsequence.length > 0) {
        [ sfirst, ...subsequence ] = subsequence;

        while (modified.length > 0) {
            [ mfirst, ...modified ] = modified;
            if (isEqual(mfirst, sfirst.modified)) {
                break;
            }

            result.push(Change.createAddition(mfirst));
        }

        while (original.length > 0) {
            [ ofirst, ...original ] = original;
            if (isEqual(ofirst, sfirst.original)) {
                break;
            }

            result.push(Change.createRemoval(ofirst));
        }

        const childrenChanges = diffTree(
            getChildren(sfirst.original),
            getChildren(sfirst.modified),
            isVariant, isEqual, getChildren
        );
        const areChildrenIdentical = childrenChanges.every(change => change.type == Change.TYPES.IDENTICAL);

        if (areChildrenIdentical && isEqual(sfirst.original, sfirst.modified)) {
            result.push(Change.createIdentity(sfirst.original));
        } else {
            result.push(Change.createUpdate(
                sfirst.original,
                sfirst.modified,
                childrenChanges
            ));
        }
    }

    while (modified.length > 0) {
        [ mfirst, ...modified ] = modified;
        result.push(Change.createAddition(mfirst));
    }

    while (original.length > 0) {
        [ ofirst, ...original ] = original;

        result.push(Change.createRemoval(ofirst));
    }

    return List(result);
}

module.exports = diffTree;
