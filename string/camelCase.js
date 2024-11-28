export default function camelCase(str) {
    return str.replace(/[-\s]([a-z])/g, (m, c) => c.toUpperCase());
}