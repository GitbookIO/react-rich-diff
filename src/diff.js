const { List, Record } = require('immutable');

const TYPES = {
    IDENTICAL: '=',
    MODIFIED:  '!',
    REMOVED:   '-',
    ADDED:     '+'
};

const DEFAULTS = {
    type:     String(TYPES.IDENTICAL),
    original: null,
    modified: null
};

class Change extends Record(DEFAULTS) {}

/**
 * Longest common subsequence
 *
 * @param  {Array} xs, ys
 * @param  {Array} head
 * @return {Array}
 */
function lcs(xs, ys, isEqual) {
    if (xs.length > 0 && ys.length > 0) {
        const [xe, ...xb] = xs;
        const [ye, ...yb] = ys;

        if (isEqual(xe, ye)) {
            return [
                {
                    original: xe,
                    modified: ye
                }
            ].concat(lcs(xb, yb, isEqual));
        }

        const a = lcs(xs, yb, isEqual);
        const b = lcs(xb, ys, isEqual);
        return (a.length > b.length) ? a : b;
    }

    return [];
}

/**
 * Diff two lists of items.
 * @param  {List}  original
 * @param  {List}  modified
 * @param  {Function} isVariant(a, b): Return true if a and b are modifiable items
 * @param  {Function} isEqual(a, b): Return true if a and b are stricly equal
 * @return {List<Change>}
 */
function diff(original, modified, isVariant, isEqual) {
    original = original.toArray();
    modified = modified.toArray();
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

            result.push(new Change({
                type: TYPES.ADDED,
                modified: mfirst
            }));
        }

        while (original.length > 0) {
            [ ofirst, ...original ] = original;
            if (isEqual(ofirst, sfirst.original)) {
                break;
            }

            result.push(new Change({
                type: TYPES.REMOVED,
                original: ofirst
            }));
        }

        result.push(new Change({
            type: isEqual(sfirst.original, sfirst.modified) ? TYPES.IDENTICAL : TYPES.MODIFIED,
            original: sfirst.original,
            modified: sfirst.modified
        }));
    }

    while (modified.length > 0) {
        [ mfirst, ...modified ] = modified;
        result.push(new Change({
            type: TYPES.ADDED,
            modified: mfirst
        }));
    }

    while (original.length > 0) {
        [ ofirst, ...original ] = original;

        result.push(new Change({
            type: TYPES.REMOVED,
            original: ofirst
        }));
    }

    return List(result);
}

module.exports = diff;
