/**
 * Escapes special characters in a string to prevent XSS attacks via HTML.
 * @param {string} str The string to escape.
 * @returns {string} The escaped string.
 * @example
 * escapeHTML('<script>alert("xss");</script>'); // '&lt;script&gt;alert("xss");&lt;/script&gt;'
 * @author theatom06
 */
export default function escapeHTML(str) {
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, char => escapeChars[char]);
}