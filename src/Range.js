/* eslint-disable react/prop-types */
const React = require('react');
const diff = require('./diff');

const schema = require('./schema');

/**
 *
 * @type {React}
 */
const Range = React.createClass({
    propTypes: {
        range: React.PropTypes.object.isRequired
    },

    render() {
        const { range } = this.props;
        return <span>{range.text}</span>;
    }
});

module.exports = Range;
