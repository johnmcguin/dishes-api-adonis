const jimp = require('jimp')

class ImageService {
    constructor() { }

    async _resize(imgPath, width) {
        const original = await jimp.read(imgPath)
        const img = await original.clone()
        const resized = await img.resize(width, jimp.AUTO)
        return resized.getBufferAsync(resized._originalMime)
    }

    async avatarize(imgPath) {
        return await this._resize(imgPath, 120)
    }

    async dishify(imgPath) {
        return await this._resize(imgPath, 750)
    }
}

module.exports = ImageService