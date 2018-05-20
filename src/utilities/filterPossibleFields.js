const filterPossibleFields = (fieldsData, possibleFields) => {

    
    possibleFields.forEach((field) => {
        if (fieldsData[field.id-1].status === "generated-field"){
            fieldsData[field.id-1].status = "possible-field";
        }
    });

    return fieldsData;
}

export default filterPossibleFields;