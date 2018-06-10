import initialFieldsData from "../data/fieldsData";

const initialState = {
    fieldsData: initialFieldsData,
}
const fieldsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FIELDS_DATA":
            state = {
                ...state,
                fieldsData: action.payload
            }
            break;
        default:
            return state
    }
    return state;
}

export default fieldsReducer;