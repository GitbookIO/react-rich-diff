const { List, Record } = require('immutable');
const diffNodes = require('./diffNodes');
const { Raw } = require('slate');

const DEFAULTS = {
    changes: List()
};

function serializeNode(node) {
    if (node.kind == 'range') {
        return Raw.serializeRange(node, { terse: true });
    }
    else {
        return Raw.serializeNode(node, { terse: true });
    }
}

class State extends Record(DEFAULTS) {
    serializeToJSON() {
        const { changes } = this;
        return {
            changes: changes
                .map(child => child.serializeToJSON(serializeNode))
                .toArray()
        };
    }

    /**
     * Create a diff state from two document.
     * @param  {Document} original
     * @param  {Document} modified
     * @return {State}
     */
    static create(original, modified) {
        const changes = diffNodes(
            original.nodes,
            modified.nodes
        );

        return new State({ changes });
    }

}

module.exports = State;
