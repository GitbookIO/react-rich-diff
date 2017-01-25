const { List, Record } = require('immutable');

const TYPES = require('./TYPES');

let KEY = 0;

const DEFAULTS = {
    key:      String(),
    type:     String(TYPES.IDENTICAL),
    // Matching score (0 for ADDED/REMOVED, 1 for IDENTICAL, 0 - 1 for MODIFIED)
    score:    Number(0),
    original: null,
    modified: null,
    children: null
};

class Change extends Record(DEFAULTS) {

    serializeToJSON(serializeNode) {
        const { type, original, modified, children } = this;

        switch (type) {
        case TYPES.REMOVED:
        case TYPES.IDENTICAL:
            return {
                type,
                original: serializeNode(original)
            };
        case TYPES.ADDED:
            return {
                type,
                modified: serializeNode(modified)
            };
        case TYPES.MODIFIED:
            return {
                type,
                // score,
                original: serializeNode(original),
                modified: serializeNode(modified),
                children: children.map(child => child.serializeToJSON(serializeNode)).toArray()
            };
        }
    }

    static create(props) {
        return new Change({
            key: `c${(KEY++)}`,
            ...props
        });
    }

    static createIdentity(value) {
        return Change.create({
            type: TYPES.IDENTICAL,
            score: 1,
            original: value,
            modified: value
        });
    }

    static createAddition(modified) {
        return Change.create({
            type: TYPES.ADDED,
            score: 0,
            modified
        });
    }

    static createRemoval(original) {
        return Change.create({
            type: TYPES.REMOVED,
            score: 0,
            original
        });
    }

    static createUpdate(original, modified, children) {
        return Change.create({
            type: TYPES.MODIFIED,
            original,
            modified,
            score: Change.getScore(children),
            children: List(children)
        });
    }

    /**
     * Calcul score for a list of changes.
     * @param  {List<Change>} changes
     * @return {Number} score
     */
    static getScore(changes) {
        if (changes.size == 0) {
            return 1;
        }

        const count = changes.reduce(
            (accu, change) => accu + change.score,
            0
        );

        return (count / changes.size);
    }
}

module.exports = Change;
module.exports.TYPES = TYPES;
