const React = require('react');
const classNames = require('classnames');

/**
 * Render a link with a tooltip to signal the change.
 * @type {React}
 */
const LinkNode = React.createClass({
    propTypes: {
        attributes: React.PropTypes.object.isRequired,
        node:       React.PropTypes.object.isRequired,
        original:   React.PropTypes.object,
        children:   React.PropTypes.node
    },

    render() {
        const { children, attributes, node, original } = this.props;

        const originalData = original ? original.data.toJS() : {};
        const modifiedData = node.data.toJS();

        let title = '';

        if (originalData.href != modifiedData.href) {
            title = `href: ${originalData.href || ''} -> ${modifiedData.href}`;
        }

        if (originalData.title != modifiedData.title) {
            title = `title: ${originalData.title || ''} -> ${modifiedData.title}`;
        }

        return (
            <a
                {...attributes}
                className={classNames(attributes.className, {
                    'tooltipped': title
                })}
                href={modifiedData.href}
                aria-label={title}
            >
                {children}
            </a>
        );
    }
});

module.exports = LinkNode;
