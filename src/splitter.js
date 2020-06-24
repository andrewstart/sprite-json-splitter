const jimp = require('jimp');
const path = require('path');

exports.execute = async function splitter(image, destination, quality, frames) {
    const sprite = await jimp.read(image);

    for (let [filename, {frame: {x, y, w, h}, spriteSourceSize: {x: sX, y: sY}}] of Object.entries(frames)) {
        const newImage = sprite.clone().crop(x, y, w, h).quality(quality);

        if (sX || sY) {
            newImage.contain(sX + w, sY + h, jimp.HORIZONTAL_ALIGN_RIGHT | jimp.VERTICAL_ALIGN_BOTTOM);
        }

        newImage.write(path.join(destination, filename));
    }
};
