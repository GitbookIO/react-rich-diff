const { List, Record } = require('immutable');

const Change = require('./Change');
const lcs = require('./lcs');

const DEFAULTS = {
    // Compare if two nodes are of the same type (for example "are they both paragraphs ?")
    isVariant:   (a, b) => a == b,
    // Compare if two nodes have the same props
    isEqual:     (a, b) => a == b,
    // Return children for an entry
    getChildren: (a => []),
    // Lower-limit to consider two nodes has modified
    threshold:   0.3
};

class Differ extends Record(DEFAULTS) {

    /**
     * Create a new differ.
     * @param {Object} props
     */
    static create(props) {
        return new Differ(props);
    }

    /**
     * Compare two nodes.
     * @param {T} a
     * @param {T} b
     * @return {Boolean|Mixed}
     */
    compare(a, b) {
        if (!this.isVariant(a, b)) {
            return false;
        }

        const children = this.diff(
            this.getChildren(a),
            this.getChildren(b)
        );

        const score = Change.getScore(children);
        if (score < this.threshold) {
            return false;
        }

        return {
            score,
            children
        };
    }


    /**
     * Create a diff from a LCS matrix.
     *
     * @param  {Array<Array<Number>>} matrix
     * @param  {Array<T>} xs
     * @param  {Array<T>} ys
     * @param  {Number} i
     * @param  {Number} j
     * @return {Array<Change>} changes
     */
    diffFromLCS(matrix, xs, ys, i, j) {
        if (i === 0 && j === 0) {
            return [];
        }

        const xv = xs[i - 1];
        const yv = ys[j - 1];

        const variant = (xv && yv && matrix[i] && matrix[i][j]) ? matrix[i][j].result : null;

        if (i > 0 && j > 0 && variant) {
            const change = (this.isEqual(xv, yv) && variant.score == 1) ? (
                Change.createIdentity(xv)
            ) : (
                Change.createUpdate(
                    xv,
                    yv,
                    variant.children
                )
            );

            return this.diffFromLCS(matrix, xs, ys, i - 1, j - 1)
                .concat([ change ]);
        }
        else if (j > 0 && (i === 0 || matrix[i][j - 1].value >= matrix[i - 1][j].value)) {
            return this.diffFromLCS(matrix, xs, ys, i, j - 1)
                .concat([
                    Change.createAddition(yv)
                ]);
        }
        else if (i > 0 && (j === 0 || matrix[i][j - 1].value < matrix[i - 1][j].value)) {
            return this.diffFromLCS(matrix, xs, ys, i - 1, j)
                .concat([
                    Change.createRemoval(xv)
                ]);
        }
        else {
            throw new Error('Invalid LCS matrix');
        }
    }

    /**
     * Diff two tree of items.
     *
     * @param  {List}  original
     * @param  {List}  modified
     * @return {List<Change>}
     */
    diff(original, modified) {
        original = List(original).toArray();
        modified = List(modified).toArray();

        if (original.length == 0 && modified.length == 0) {
            return List();
        }

        const matrix = lcs.computeLcsMatrix(
            original,
            modified,
            (a, b) => this.compare(a, b)
        );

        const result = this.diffFromLCS(matrix, original, modified, original.length, modified.length);

        return List(result);
    }

}

module.exports = Differ;
