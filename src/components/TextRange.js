const React = require('react');
const schema = require('../schema');

/**
 * Leaf of a document: text range
 * @type {React}
 */
const TextRange = React.createClass({
    propTypes: {
        range:      React.PropTypes.object.isRequired,
        attributes: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            attributes: {}
        };
    },

    render() {
        const { range, attributes } = this.props;
        const { marks, text } = range;

        if (marks.isEmpty()) {
            return (
                <span {...attributes}>{range.text}</span>
            );
        }

        let i = 0;
        return marks
            .reduce(
                (children, mark) => {
                    i++;
                    const Wrapper = schema.marks[mark.type];

                    if (i == marks.size) {
                        return <Wrapper attributes={attributes}>{children}</Wrapper>;
                    }

                    return <Wrapper>{children}</Wrapper>;
                },
                text
            );
    }
});

module.exports = TextRange;
