const Jimp = require('jimp');
const path = require('path');

exports.execute = async function splitter(image, destination, quality, frames) {
    const sprite = await Jimp.read(image);

    for (let [key, data] of Object.entries(frames)) {
        const {x, y, w, h} = data.frame;
        let filename = path.join(destination, key);
        if (!filename.endsWith('.png')) filename += '.png';
        const newImage = sprite.clone().crop(x, y, w, h).quality(quality);

        if (!data.trimmed) {
            newImage.write(filename);
        } else {
            const canvas = new Jimp(data.sourceSize.w, data.sourceSize.h);

            canvas.blit(newImage, data.spriteSourceSize.x, data.spriteSourceSize.y).write(filename);
        }
    }
};
