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

        const originalID = original ? original.data.get('id', '<none>') : null;
        const modifiedID = node.data.get('id', '<none>');

        let title = '';

        if (original && originalTag != modifiedTag) {
            title = `Tag: ${originalTag} -> ${modifiedTag}`;
        }

        if (original && originalID != modifiedID) {
            title = `${title ? title + ', ' : ''}ID: ${originalID} -> ${modifiedID}`;
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
