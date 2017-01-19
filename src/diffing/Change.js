const { List, Record } = require('immutable');

const TYPES = require('./TYPES');

let KEY = 0;

const DEFAULTS = {
    key:      String(),
    type:     String(TYPES.IDENTICAL),
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
                original: serializeNode(original),
                modified: serializeNode(modified),
                children: children.map(child => child.serializeToJSON(serializeNode)).toArray()
            };
        }
    }

    static create(props) {
        return new Change({
            key: String(KEY++),
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
