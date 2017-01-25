const { List } = require('immutable');
const TYPES = require('./TYPES');

/**
 * Group changes to wrap identical nodes.
 * @param  {List<Change>} changes
 * @param  {Number} minToWrap
 * @param  {Number} borderSize
 * @return {List<Change|List<Change>} groups
 */
function groupChanges(changes, minToWrap, borderSize = 1) {
    if (!minToWrap) {
        return changes;
    }

    let results = [];
    let accu = [];

    changes.forEach((change, i) => {
        const isLast = (i == (changes.size - 1));
        const isIdentical = change.type == TYPES.IDENTICAL;

        if (isIdentical) {
            accu.push(change);
        }

        if (!isIdentical || isLast) {
            if (accu.length > minToWrap) {
                const toWrap = accu.slice(0, -borderSize);
                const border = accu.slice(-borderSize);

                results.push(List(toWrap));
                results = results.concat(border);
            } else {
                results = results.concat(accu);
            }
            accu = [];
        }

        if (!isIdentical) {
            results.push(change);
        }
    });

    return List(results);
}

module.exports = groupChanges;
