export default function intersection(...arrays){
    let result = []
    arrays[0].forEach(e => {
        if(arrays.every(a => a.includes(e)))
            result.add(e);
    });
    return result;
}