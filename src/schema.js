/* eslint-disable react/prop-types */
const React = require('react');
const { BLOCKS, MARKS, INLINES } = require('markup-it');

const SCHEMA = {
    nodes: {
        [BLOCKS.PARAGRAPH]:  (props => <p>{props.children}</p>),
        [BLOCKS.BLOCKQUOTE]: (props => <blockquote>{props.children}</blockquote>),
        [BLOCKS.HR]:         (props => <hr />),
        [BLOCKS.CODE]:       (props => <pre><code>{props.children}</code></pre>),
        // Tables
        [BLOCKS.TABLE]:      (props => <table><tbody>{props.children}</tbody></table>),
        [BLOCKS.TABLE_ROW]:  (props => <tr>{props.children}</tr>),
        [BLOCKS.TABLE_CELL]: (props => <td>{props.children}</td>),
        // Lists
        [BLOCKS.UL_LIST]:    (props => <ul>{props.children}</ul>),
        [BLOCKS.OL_LIST]:    (props => <ol>{props.children}</ol>),
        [BLOCKS.LIST_ITEM]:  (props => <li>{props.children}</li>),
        // Headings
        [BLOCKS.HEADING_1]:  (props => <h1>{props.children}</h1>),
        [BLOCKS.HEADING_2]:  (props => <h2>{props.children}</h2>),
        [BLOCKS.HEADING_3]:  (props => <h3>{props.children}</h3>),
        [BLOCKS.HEADING_4]:  (props => <h4>{props.children}</h4>),
        [BLOCKS.HEADING_5]:  (props => <h5>{props.children}</h5>),
        [BLOCKS.HEADING_6]:  (props => <h6>{props.children}</h6>),
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
