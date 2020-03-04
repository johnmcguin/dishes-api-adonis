const { getRandomIndex } = require('./random-index')

module.exports = { getRandomEntity }

/**
 * Gets a random entity from an array of entities, optionally excluding one (by index)
 * @param {array} arr array
 * @param {number} notIdx index to exclude
 */
function getRandomEntity(arr, notIdx) {
    const idx = getRandomIndex(arr, notIdx)
    return arr[idx]
}