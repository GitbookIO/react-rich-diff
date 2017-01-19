const { List, Record } = require('immutable');
const TYPES = require('./TYPES');

let KEY = 0;

const DEFAULTS = {
    type:     String(TYPES.IDENTICAL),
    original: null,
    modified: null,
    children: null
};

class Change extends Record(DEFAULTS) {

    static create(props) {
        return new Change({
            key: (KEY++),
            ...props
        });
    }

    static createIdentity(value) {
        return Change.create({
            type: TYPES.IDENTICAL,
            original: value,
            modified: value
        });
    }

    static createAddition(modified) {
        return Change.create({
            type: TYPES.ADDED,
            modified
        });
    }

    static createRemoval(original) {
        return Change.create({
            type: TYPES.REMOVED,
            original
        });
    }

    static createUpdate(original, modified, children) {
        return Change.create({
            type: TYPES.MODIFIED,
            original,
            modified,
            children: List(children)
        });
    }
}

module.exports = Change;
module.exports.TYPES = TYPES;
