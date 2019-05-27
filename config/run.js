require('babel-register')({
    presets: ['env', 'stage-0'],
    plugins: [
        `transform-runtime`,
        `transform-decorators-legacy`
    ]
});

const { argv = [] } = process;

const fileName = argv[argv.length - 1];

module.exports = require(`./${fileName}`);