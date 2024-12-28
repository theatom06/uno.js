/**
 * Unescapes HTML entities in a given string.
 * @example
 * unescapeHTML('foo &amp; bar'); // 'foo & bar'
 * @param {string} str The string containing HTML entities to be unescaped.
 * @returns {string} The unescaped string.
 * @author theatom06
 */
export default function unescapeHTML(str) {
    const unescapeChars = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    };
    return str.replace(/&(amp|lt|gt|quot|#39);/g, char => unescapeChars[char]);
}