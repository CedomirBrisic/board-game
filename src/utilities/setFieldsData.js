const setFieldsData = (rawFieldsData, inputFieldsData) => {
    const fieldsData = rawFieldsData;
    for (let i = 0; i < inputFieldsData.length; i++) {
        let id = inputFieldsData[i].id;
        fieldsData[id - 1] = inputFieldsData[i];
    }
    return fieldsData
}

export default setFieldsData