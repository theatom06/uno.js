export default function truncate(str, length) {
    return str.length > length ? str.slice(0, length) + '...' : str;
}