/* eslint-disable react/prop-types */
const React = require('react');
const { BLOCKS, MARKS, INLINES } = require('markup-it');

const Heading = require('./Heading');
const Image = require('./Image');
const Link = require('./Link');
const Table = require('./Table');

function componentFromTag(tagName) {
    return (props) => {
        return React.createElement(tagName, {
            ...props.attributes
        }, props.children);
    };
}

const SCHEMA = {
    defaultBlock:  componentFromTag('div'),
    defaultInline: componentFromTag('span'),
    // Nodes
    nodes: {
        [BLOCKS.PARAGRAPH]:  componentFromTag('p'),
        [BLOCKS.BLOCKQUOTE]: componentFromTag('blockquote'),
        [BLOCKS.HR]:         (props => <hr {...props.attributes} />),
        [BLOCKS.CODE]:       componentFromTag('pre'),
        // Tables
        [BLOCKS.TABLE]:      Table,
        [BLOCKS.TABLE_ROW]:  componentFromTag('tr'),
        [BLOCKS.TABLE_CELL]: componentFromTag('td'),
        // Lists
        [BLOCKS.UL_LIST]:    componentFromTag('ul'),
        [BLOCKS.OL_LIST]:    componentFromTag('ol'),
        [BLOCKS.LIST_ITEM]:  componentFromTag('li'),
        // Headings
        [BLOCKS.HEADING_1]:  Heading,
        [BLOCKS.HEADING_2]:  Heading,
        [BLOCKS.HEADING_3]:  Heading,
        [BLOCKS.HEADING_4]:  Heading,
        [BLOCKS.HEADING_5]:  Heading,
        [BLOCKS.HEADING_6]:  Heading,
        // Inline
        [INLINES.IMAGE]:     Image,
        [INLINES.LINK]:      Link
    },
    marks: {
        [MARKS.BOLD]:          componentFromTag('strong'),
        [MARKS.ITALIC]:        componentFromTag('em'),
        [MARKS.STRIKETHROUGH]: componentFromTag('del'),
        [MARKS.CODE]:          componentFromTag('code')
    }
};

module.exports = SCHEMA;
