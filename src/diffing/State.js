const { List, Record } = require('immutable');
const diffNodes = require('./diffNodes');

const DEFAULTS = {
    changes: List()
};

class State extends Record(DEFAULTS) {

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
