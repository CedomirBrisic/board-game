import calculatePossibleFields from "./possibleFields";
import fieldsData from "../data/fieldsData";

const generateLevel = (initialFieldData, level) => {
    
    let lastPlacedField = initialFieldData;
    let generatedFields = [lastPlacedField];

    if (level < 91) {

        for (let i = 0; i < level; i++) {
            const allPossibilities = calculatePossibleFields(lastPlacedField)
            const possibleFields = [];

            for (let j = 0 ; j < allPossibilities.length; j++){
                let c= 0;
                for (let k = 0; k < generatedFields.length; k++){
                    if (generatedFields[k].id !== allPossibilities[j].id){
                        c++
                    }
                    if (c === generatedFields.length){
                        possibleFields.push(allPossibilities[j])
                    }
                }
            }
            if (possibleFields.length === 0) {
                i = -1;
                generatedFields = [initialFieldData];
            } else {
                const nextFieldIndex = Math.floor((Math.random() * possibleFields.length));
                lastPlacedField = possibleFields[nextFieldIndex];
                lastPlacedField.status = "generated-field";

                generatedFields.push(lastPlacedField)
            }
        }
    } else {
        const plainFields = 99 - level
        fieldsData.forEach((field) => {
            if (field.id !== initialFieldData.id) {
                field.status = "generated-field";
            }
        })
        for (let i = 0; i < plainFields; i++) {
            const randomFieldIndex = Math.floor((Math.random() * 100));
            if (fieldsData[randomFieldIndex].id !== initialFieldData.id &&
                fieldsData[randomFieldIndex].status !== "plain") {
                fieldsData[randomFieldIndex].status = "plain";
            } else {
                i--;
            }
        }
        generatedFields.push(fieldsData)
    }

    return generatedFields
}

export default generateLevel;