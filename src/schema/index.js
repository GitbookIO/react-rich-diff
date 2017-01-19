/* eslint-disable react/prop-types */
const React = require('react');
const { BLOCKS, MARKS, INLINES } = require('markup-it');

const Heading = require('./Heading');

function componentFromtag(tagName) {
    return (props) => {
        return React.createElement(tagName, {
            ...props.attributes
        }, props.children);
    };
}

const SCHEMA = {
    defaultBlock:  componentFromtag('div'),
    defaultInline: componentFromtag('span'),
    // Nodes
    nodes: {
        [BLOCKS.PARAGRAPH]:  componentFromtag('p'),
        [BLOCKS.BLOCKQUOTE]: componentFromtag('blockquote'),
        [BLOCKS.HR]:         (props => <hr {...props.attributes} />),
        [BLOCKS.CODE]:       componentFromtag('pre'),
        // Tables
        [BLOCKS.TABLE]:      componentFromtag('table'),
        [BLOCKS.TABLE_ROW]:  componentFromtag('tr'),
        [BLOCKS.TABLE_CELL]: componentFromtag('td'),
        // Lists
        [BLOCKS.UL_LIST]:    componentFromtag('ul'),
        [BLOCKS.OL_LIST]:    componentFromtag('ol'),
        [BLOCKS.LIST_ITEM]:  componentFromtag('li'),
        // Headings
        [BLOCKS.HEADING_1]:  Heading,
        [BLOCKS.HEADING_2]:  Heading,
        [BLOCKS.HEADING_3]:  Heading,
        [BLOCKS.HEADING_4]:  Heading,
        [BLOCKS.HEADING_5]:  Heading,
        [BLOCKS.HEADING_6]:  Heading,
        // Inline
        [INLINES.IMAGE]:     (props => <img src={props.node.data.get('src')} />),
        [INLINES.LINK]:      (props => <a href={props.node.data.get('href')}>{props.children}</a>)
    },
    marks: {
        [MARKS.BOLD]:          (props => <strong>{props.children}</strong>),
        [MARKS.ITALIC]:        (props => <em>{props.children}</em>),
        [MARKS.STRIKETHROUGH]: (props => <del>{props.children}</del>),
        [MARKS.CODE]:          (props => <code>{props.children}</code>)
    }
};

module.exports = SCHEMA;
