# react-rich-diff

[![Build Status](https://travis-ci.org/GitbookIO/react-rich-diff.svg?branch=master)](https://travis-ci.org/GitbookIO/react-rich-diff) [![NPM version](https://badge.fury.io/js/react-rich-diff.svg)](http://badge.fury.io/js/react-rich-diff)

React component to display a rich diff between two [Markup-it](https://github.com/GitbookIO/markup-it) documents.

### Installation

```
$ npm install react-rich-diff --save
```

### Usage

```js
const React = require('react');
const RichDiff = require('react-rich-diff');
const MarkupIt = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const state = MarkupIt.State.create(markdown);

const MyApp = React.createClass({
    render() {
        const original = state.deserializeToDocument('Hello **World**');
        const modified = state.deserializeToDocument('Hello **World 2**');

        const state = RichDiff.State.create(original, modified);

        return (
            <RichDiff
                state={state}
                />
        )
    }
})
```

### CSS

`react-rich-diff` creates HTML elements with classes `diff-<kind>-<type`.

`kind` can be one of `block`, `inline` or `character`.
`type` can be one of `added`, `removed` or `modified`.
