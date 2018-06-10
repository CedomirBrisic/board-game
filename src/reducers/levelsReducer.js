const initialState = {
    startLevel: 1,
    level: 1,
    levelReached: 1,
}
const levelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_START_LEVEL":
            state = {
                ...state,
                startLevel: action.payload
            }
            break;
        case "SET_LEVEL":
            state = {
                ...state,
                level: action.payload
            }
            break;
        case "SET_LEVEL_REACHED":
            state = {
                ...state,
                levelReached: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}

export default levelsReducer;