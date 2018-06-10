const initialState = {
    lives: 1
}
const livesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LIVES":
            state = {
                ...state,
                lives: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}

export default livesReducer;