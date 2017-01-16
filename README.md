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
        const base = state.deserializeToDocument('Hello **World**');
        const head = state.deserializeToDocument('Hello **World 2**');

        return (
            <RichDiff
                base={base}
                head={head}
            />
        )
    }
})
```
