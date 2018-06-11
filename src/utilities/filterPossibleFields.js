
/**
 * it updates fields-data with "possible" attribute only if field has "generated" attribute
 * @param {object} fieldsData
 * @param {object} possibleFields
 * @returns object with updated fields-data
*/
const filterPossibleFields = (fieldsData, possibleFields) => {
    possibleFields.forEach((field) => {
        if (fieldsData[field.id-1].status === "generated-field"){
            fieldsData[field.id-1].status = "possible-field";
        }
    });
    return fieldsData;
}

export default filterPossibleFields;

