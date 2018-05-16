const setFieldsData = (fieldsData, fieldsToUpdate) => {
    
    fieldsToUpdate.forEach((field) => {
        fieldsData[field.id-1] = field;
    });

    return fieldsData
}

export default setFieldsData