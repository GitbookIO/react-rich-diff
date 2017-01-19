const MarkupIt = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const RichDiff = require('./src');

function parse(str) {
    const state = MarkupIt.State.create(markdown);
    return state.deserializeToDocument(str);
}

const originalDocument = parse('# Summary\n\n* [What is XYZ?](first-question.md)\n* [How can I do X?](second-question.md)\n');
const modifiedDocument = parse('# Summary\n\n* [Introduction](README.md)\n* [What is XYZ?](first-question.md)\n* [How can I do X?](second-question.md)\n* [What are changes requests ?](what-are-changes-requests-.md)\n\n');

const state = RichDiff.State.create(originalDocument, modifiedDocument);
console.log(state.toJSON());
