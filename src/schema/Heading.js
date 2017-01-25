const React = require('react');
const classNames = require('classnames');
const { BLOCKS } = require('markup-it');
const diffToTitle = require('./diffToTitle');

const TAGS = {
    [BLOCKS.HEADING_1]:  'h1',
    [BLOCKS.HEADING_2]:  'h2',
    [BLOCKS.HEADING_3]:  'h3',
    [BLOCKS.HEADING_4]:  'h4',
    [BLOCKS.HEADING_5]:  'h5',
    [BLOCKS.HEADING_6]:  'h6'
};

const CRITERIAS = [
    {
        label: 'Tag',
        ignoreUnset: true,
        value: (node => TAGS[node.type])
    },
    {
        label: 'ID',
        value: (node => node.data.get('id'))
    }
];

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
        const nodeTag = TAGS[node.type];


        const title = diffToTitle(original, node, CRITERIAS);

        return React.createElement(nodeTag, {
            ...attributes,
            className: classNames(attributes.className, {
                'tooltipped': title
            }),
            'aria-label': title
        }, children);
    }
});

module.exports = HeadingNode;
