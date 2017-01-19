const React = require('react');
const classNames = require('classnames');
const { BLOCKS } = require('markup-it');

const TAGS = {
    [BLOCKS.HEADING_1]:  'h1',
    [BLOCKS.HEADING_2]:  'h2',
    [BLOCKS.HEADING_3]:  'h3',
    [BLOCKS.HEADING_4]:  'h4',
    [BLOCKS.HEADING_5]:  'h5',
    [BLOCKS.HEADING_6]:  'h6'
};

/**
 * Render an heading that has been modified.
 * @type {React}
 */
const HeadingNode = React.createClass({
    propTypes: {
        original:   React.PropTypes.object,
        attributes: React.PropTypes.object.isRequired,
        node:       React.PropTypes.object.isRequired,
        children:   React.PropTypes.node.isRequired
    },

    render() {
        const { children, attributes, node, original } = this.props;

        const originalTag = original ? TAGS[original.type] : null;
        const modifiedTag = TAGS[node.type];

        let title = '';

        if (originalTag != modifiedTag) {
            title = `Tag: ${originalTag} -> ${modifiedTag}`;
        }

        return React.createElement(modifiedTag, {
            ...attributes,
            className: classNames(attributes.className, {
                'tooltipped': title
            }),
            'aria-label': title
        }, children);
    }
});

module.exports = HeadingNode;
