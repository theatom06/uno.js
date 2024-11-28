export default function snakeCase(str) {
    return str.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}