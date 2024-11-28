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