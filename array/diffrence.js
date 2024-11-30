export default function difference(...arrays){
    return arrays.reduce((a, b) => a.filter(c => !b.includes(c)));
}