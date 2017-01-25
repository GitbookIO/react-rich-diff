const React = require('react');
const ReactDOM = require('react-dom');
const MarkupIt = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const RichDiff = require('../src');

const ORGINAL = `
# Example

This paragraph will be wrap because it's not changing.

> this blockquote will also be wrapped.

And changes begin:

* Hello the world.
* This is so cool

| A | B |
| -- | -- |
| a1 | b1 |
| a2 | a2 |
`;

const MODIFIED = `
# Example

This paragraph will be wrap because it's not changing.

> this blockquote will also be wrapped.

And changes begin:

* This entry is inserted
* Hello the world.
* This is so cool

| A | B |
| -- | -- |
| a1 | b1 |
| a2 | b2 |
| a3 | b3 |
`;


function parse(str) {
    const state = MarkupIt.State.create(markdown);
    return state.deserializeToDocument(str);
}

const Example = React.createClass({
    getInitialState() {
        return {
            original: ORGINAL,
            modified: MODIFIED
        };
    },

    render() {
        const { original, modified } = this.state;

        const originalDocument = parse(original);
        const modifiedDocument = parse(modified);

        const state = RichDiff.State.create(originalDocument, modifiedDocument);

        return (
            <div>
                <div className="EditionArea">
                    <textarea
                        value={original}
                        rows={8}
                        onChange={e => this.setState({ original: e.target.value })}
                        />
                    <textarea
                        value={modified}
                        rows={8}
                        onChange={e => this.setState({ modified: e.target.value })}
                        />
                </div>

                <div className="">
                    <RichDiff
                        state={state}
                        />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
