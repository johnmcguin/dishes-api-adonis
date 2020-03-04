module.exports = { getRandomIndex }

/**
 * 
 * @param {array} arr array
 * @param {number} exclude index to exclude
 */
function getRandomIndex(arr, exclude) {
    const random = Math.floor(Math.random() * arr.length)
    if (exclude && (random === exclude)) return getRandomIndex(arr, exclude)
    return random
}