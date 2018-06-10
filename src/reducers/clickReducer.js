const initialState = {
    isInitialClick: true,
    leftToClick: 1,
}
const clickReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_INITIAL_CLICK":
            state = {
                ...state,
                isInitialClick: action.payload
            }
            break;
        case "SET_LEFT_TO_CLICK":
            state = {
                ...state,
                leftToClick: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}

export default clickReducer;