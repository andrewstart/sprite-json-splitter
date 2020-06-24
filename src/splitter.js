const jimp = require('jimp');
const path = require('path');

exports.execute = async function splitter(image, destination, quality, frames) {
    const sprite = await jimp.read(image);

    for (let [filename, {frame: {x, y, w, h}}] of Object.entries(frames)) {
        sprite.clone().crop(x, y, w, h).quality(quality).write(path.join(destination, filename));
    }
};
