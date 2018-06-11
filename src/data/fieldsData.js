/**
 * self-invoked anonymus function that creates data object for fields
 * @param  {} (
 * @returns object with initial fields data
 */
const fieldsData = (() => {
    let id = 1;
    const output = [];

    for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
            let field = {
                "id": id,
                "x": x,
                "y": y,
                "status": "plain"
            }
            id++
            output.push(field)
        }
    }
    return output
})()

export default fieldsData;