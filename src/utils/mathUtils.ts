/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param min The minimum number
 * @param max The maximum number
 * @returns number
 * @example randomIntBetween(1, 10); // => 5
*/
export function randomIntBetween(
    min: number,
    max: number,
): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
