import { customAlphabet } from "nanoid/non-secure";

// -_ with https://github.com/CyberAP/nanoid-dictionary?tab=readme-ov-file#nolookalikessafe
const noLookAlikesSafe = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz-_~";

/**
 * Tested with https://zelark.github.io/nano-id-cc
 * With 1000 IDs generated per hour,
 * 14 days or 327K IDs needed,
 * in order to have a 1% probability of at least one collision.
 */
export const makeId = customAlphabet(noLookAlikesSafe, 8);
