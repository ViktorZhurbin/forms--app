import { customAlphabet } from "nanoid";

// https://github.com/CyberAP/nanoid-dictionary?tab=readme-ov-file#nolookalikessafe
const noLookAlikesSafe = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz";

/**
 * Tested with https://zelark.github.io/nano-id-cc
 * With 1000 IDs generated per hour,
 * ~35 years or 308M IDs needed,
 * in order to have a 1% probability of at least one collision.
 */
export const makeId = customAlphabet(noLookAlikesSafe, 12);
