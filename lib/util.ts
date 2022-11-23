/**
 * Gets random int
 * @param min
 * @param max
 * @returns random int - min & max inclusive
 */
export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
