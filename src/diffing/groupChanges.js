const { List } = require('immutable');
const TYPES = require('./TYPES');

/**
 * Group changes to wrap identical nodes.
 * @param  {List<Change>} changes
 * @param  {Number} minToWrap
 * @return {List<Change|List<Change>} groups
 */
function groupChanges(changes, minToWrap) {
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
                results.push(List(accu));
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
