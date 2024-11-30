export default function union(...arrays){
    return [...new Set(arrays.flat())];
}