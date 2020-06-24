const fs = require('fs');
const yargs = require('yargs');
const splitter = require('./splitter');

const argv = yargs
    .option('image', {
        alias: 'i',
        description: 'Sprite image',
        type: 'string',
        demandOption: true
    })
    .option('schema', {
        alias: 's',
        description: 'Sprite JSON schema',
        type: 'string',
        demandOption: true
    })
    .option('destination', {
        alias: 'd',
        description: 'Destination folder for images',
        default: 'images',
        type: 'string'
    })
    .option('quality', {
        alias: 'q',
        description: 'Quality of split images',
        default: 100,
        type: 'number'
    })
    .help()
    .alias('help', 'h')
    .argv;

if (!fs.existsSync(argv.image)) {
    throw new Error(`Image file "${argv.image}" doesn't exist`);
}

if (!fs.existsSync(argv.schema)) {
    throw new Error(`Schema file "${argv.schema}" doesn't exist`);
}

if (!fs.existsSync(argv.destination)){
    fs.mkdirSync(argv.destination);
}



const schema = JSON.parse(fs.readFileSync(argv.schema));

if (!schema.frames || schema.frames.constructor !== Object) {
    throw new Error(`Schema file "${argv.schema}" has wrong format`);
}

splitter.execute(argv.image, argv.destination, argv.quality, schema.frames);
