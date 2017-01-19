const { List } = require('immutable');

/**
 * Split a text node into a list of range.
 * Range are defined by common marks and words.
 *
 * @param {Text} node
 * @return {List<Range>}
 */
function getRangesFromText(text) {
    const ranges = text.getRanges()
    .reduce((result, range) => {
        const words = range.text.split(/(\s+)/);

        words.forEach((word) => {
            if (!word) {
                return;
            }

            result.push(range.set('text', word));
        });

        return result;
    }, []);

    return List(ranges);
}

module.exports = getRangesFromText;
