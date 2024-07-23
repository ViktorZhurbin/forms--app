import { customAlphabet } from "nanoid/non-secure";

//  https://github.com/CyberAP/nanoId-dictionary?tab=readme-ov-file#nolookalikessafe
const noLookAlikesSafe = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz";

const makeSubId = customAlphabet(noLookAlikesSafe, 4);

/**
 * Tested with https://zelark.github.io/nano-id-cc
 * With 1000 IDs generated per hour,
 * ~35 years or 308M IDs needed,
 * in order to have a 1% probability of at least one collision.
 */
const makeId = customAlphabet(noLookAlikesSafe, 12);

export { makeSubId, makeId };
