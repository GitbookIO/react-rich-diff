const React = require('react');
const ReactDOM = require('react-dom');
const MarkupIt = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const RichDiff = require('../src');

function parse(str) {
    const state = MarkupIt.State.create(markdown);
    return state.deserializeToDocument(str);
}

const Example = React.createClass({
    getInitialState() {
        return {
            original: '# Hello\n\nWorld',
            modified: '# Hello\n\nWord'
        };
    },

    render() {
        const { original, modified } = this.state;

        const originalDocument = parse(original);
        const modifiedDocument = parse(modified);

        const state = RichDiff.State.create(original, modified);

        return (
            <div>
                <textarea
                    value={original}
                    onChange={e => this.setState({ original: e.target.value })}
                    />
                <textarea
                    value={modified}
                    onChange={e => this.setState({ modified: e.target.value })}
                    />
                <RichDiff
                    state={state}
                    />
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
