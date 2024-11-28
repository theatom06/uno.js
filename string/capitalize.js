export default function capitalize(str, allWords = false) {
    if (allWords) 
        return str.split(' ').map(word => capitalize(word)).join(' ');
    
    return str.charAt(0).toUpperCase() + str.slice(1);
}