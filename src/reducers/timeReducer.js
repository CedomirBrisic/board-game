const initialState = {
    levelTime: 0,
}
const timeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LEVEL_TIME":
            state = {
                ...state,
                levelTime: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}

export default timeReducer;