/**
 * Format dates into a given format
 * @param {Date} date The date to format. 
 * @param {string} format The format to format the date into. 
 * @returns {string} The formatted date.
 * @example
 * formatDate(new Date(), 'MM/DD/YYYY HH:mm:ss'); // '01/01/1970 00:00:00'
 * @author theatom06
 */
export default function formatDate(date, format) {
    const map = {
        'MM': ('0' + (date.getMonth() + 1)).slice(-2),
        'DD': ('0' + date.getDate()).slice(-2),
        'YYYY': date.getFullYear(),
        'HH': ('0' + date.getHours()).slice(-2),
        'mm': ('0' + date.getMinutes()).slice(-2),
        'ss': ('0' + date.getSeconds()).slice(-2)
    };
    return format.replace(/MM|DD|YYYY|HH|mm|ss/gi, matched => map[matched]);
}