const fs = require('fs');
const path = require('path');
const expect = require('expect');
const yaml = require('js-yaml');
const Slate = require('slate');

const { State } = require('../src/');

/**
 * Read a YAML file.
 * @param  {String} filePath
 * @return {Object}
 */
function readFileInput(filePath) {
    const content = fs.readFileSync(filePath);
    return yaml.safeLoad(content);
}

/**
 * Run test in a directory
 * @param  {String} folder
 */
function runTest(folder) {
    // Read the original
    const originalFile = path.resolve(folder, 'original.yaml');
    const originalData = readFileInput(originalFile);
    const original = Slate.Raw.deserialize(originalData, { terse: true }).document;

    // Read the modified
    const modifiedFile = path.resolve(folder, 'modified.yaml');
    const modifiedData = readFileInput(modifiedFile);
    const modified = Slate.Raw.deserialize(modifiedData, { terse: true }).document;

    // Read the expected
    const expectedFile = path.resolve(folder, 'expected.yaml');
    const expectedData = readFileInput(expectedFile);

    const state = State.create(original, modified);
    const stateAsJSON = state.serializeToJSON();
    expect(stateAsJSON).toEqual(expectedData);
}


describe('State', () => {
    const fixturesPath = path.resolve(__dirname, 'fixtures');
    const tests = fs.readdirSync(fixturesPath);
    tests.forEach((test) => {
        const testPath = path.resolve(fixturesPath, test);

        if (!fs.lstatSync(testPath).isDirectory()) {
            return;
        }

        it(test, () => runTest(testPath));
    });

});
