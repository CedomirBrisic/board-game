
/**
 * it updates fields-data
 * @param {object} fieldsData
 * @param {object} fieldsToUpdate
 * @returns object with updated fields-data
*/
const setFieldsData = (fieldsData, fieldsToUpdate) => {

    fieldsToUpdate.forEach((field) => {
        fieldsData[field.id-1] = field;
    });

    return fieldsData
}

export default setFieldsData