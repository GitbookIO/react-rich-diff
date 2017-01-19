const expect = require('expect');
const diffTree = require('../src/diffing/diffTree');

describe('diffTree', () => {

    describe('flat', () => {
        const isVariant = (a, b) => a.type == b.type;
        const isEqual = (a, b) => a.type == b.type && a.text == b.text;
        const getChildren = a => [];

        it('should detect additions at end', () => {
            const original = [
                { type: 'heading', text: 'Hello' },
                { type: 'paragraph', text: 'World' }
            ];
            const modified = [
                { type: 'heading', text: 'Hello' },
                { type: 'paragraph', text: 'World' },
                { type: 'paragraph', text: 'the' }
            ];

            const result = diffTree(original, modified, isVariant, isEqual, getChildren);

            expect(result.toJS()).toEqual([
                {
                    type: 'identical',
                    original: { type: 'heading', text: 'Hello' },
                    modified: { type: 'heading', text: 'Hello' },
                    children: null
                },
                {
                    type: 'identical',
                    original: { type: 'paragraph', text: 'World' },
                    modified: { type: 'paragraph', text: 'World' },
                    children: null
                },
                {
                    type: 'added',
                    original: null,
                    modified: { type: 'paragraph', text: 'the' },
                    children: null
                }
            ]);
        });

        it('should detect additions at begining', () => {
            const original = [
                { type: 'heading', text: 'Hello' },
                { type: 'paragraph', text: 'World' }
            ];
            const modified = [
                { type: 'paragraph', text: 'Yo' },
                { type: 'heading', text: 'Hello' },
                { type: 'paragraph', text: 'World' }
            ];

            const result = diffTree(original, modified, isVariant, isEqual, getChildren);

            expect(result.toJS()).toEqual([
                {
                    type: 'added',
                    original: null,
                    modified: { type: 'paragraph', text: 'Yo' },
                    children: null
                },
                {
                    type: 'identical',
                    original: { type: 'heading', text: 'Hello' },
                    modified: { type: 'heading', text: 'Hello' },
                    children: null
                },
                {
                    type: 'identical',
                    original: { type: 'paragraph', text: 'World' },
                    modified: { type: 'paragraph', text: 'World' },
                    children: null
                }
            ]);
        });
    });

    describe('deep', () => {
        const isVariant = (a, b) => a.type == b.type;
        const isEqual = (a, b) => a.type == b.type && a.text == b.text;
        const getChildren = a => a.chars || [];

        it('should diff children', () => {
            const original = [
                { type: 'heading', chars: [
                    { type: 'text', text: 'Y' },
                    { type: 'text', text: 'o' }
                ] },
                { type: 'paragraph', chars: [
                    { type: 'text', text: 'C' },
                    { type: 'text', text: 'o' },
                    { type: 'text', text: 'o' },
                    { type: 'text', text: 'l' }
                ] }
            ];
            const modified = [
                { type: 'heading', chars: [
                    { type: 'bold', text: 'Y' },
                    { type: 'bold', text: 'o' }
                ] },
                { type: 'paragraph', chars: [
                    { type: 'text', text: 'C' },
                    { type: 'text', text: 'o' },
                    { type: 'text', text: 'o' },
                    { type: 'text', text: 'l' }
                ] },
                { type: 'paragraph', chars: [
                    { type: 'text', text: '!' }
                ] }
            ];

            const result = diffTree(original, modified, isVariant, isEqual, getChildren);
            expect(result.toJS()).toEqual(
                [
                    {
                        'type': 'modified',
                        'original': {
                            'type': 'heading',
                            'chars': [
                                {
                                    'type': 'text',
                                    'text': 'Y'
                                },
                                {
                                    'type': 'text',
                                    'text': 'o'
                                }
                            ]
                        },
                        'modified': {
                            'type': 'heading',
                            'chars': [
                                {
                                    'type': 'bold',
                                    'text': 'Y'
                                },
                                {
                                    'type': 'bold',
                                    'text': 'o'
                                }
                            ]
                        },
                        'children': [
                            {
                                'type': 'added',
                                'original': null,
                                'modified': {
                                    'type': 'bold',
                                    'text': 'Y'
                                },
                                'children': null
                            },
                            {
                                'type': 'added',
                                'original': null,
                                'modified': {
                                    'type': 'bold',
                                    'text': 'o'
                                },
                                'children': null
                            },
                            {
                                'type': 'removed',
                                'original': {
                                    'type': 'text',
                                    'text': 'Y'
                                },
                                'modified': null,
                                'children': null
                            },
                            {
                                'type': 'removed',
                                'original': {
                                    'type': 'text',
                                    'text': 'o'
                                },
                                'modified': null,
                                'children': null
                            }
                        ]
                    },
                    {
                        'type': 'identical',
                        'original': {
                            'type': 'paragraph',
                            'chars': [
                                {
                                    'type': 'text',
                                    'text': 'C'
                                },
                                {
                                    'type': 'text',
                                    'text': 'o'
                                },
                                {
                                    'type': 'text',
                                    'text': 'o'
                                },
                                {
                                    'type': 'text',
                                    'text': 'l'
                                }
                            ]
                        },
                        'modified': {
                            'type': 'paragraph',
                            'chars': [
                                {
                                    'type': 'text',
                                    'text': 'C'
                                },
                                {
                                    'type': 'text',
                                    'text': 'o'
                                },
                                {
                                    'type': 'text',
                                    'text': 'o'
                                },
                                {
                                    'type': 'text',
                                    'text': 'l'
                                }
                            ]
                        },
                        'children': null
                    },
                    {
                        'type': 'added',
                        'original': null,
                        'modified': {
                            'type': 'paragraph',
                            'chars': [
                                {
                                    'type': 'text',
                                    'text': '!'
                                }
                            ]
                        },
                        'children': null
                    }
                ]
            );
        });
    });

});
