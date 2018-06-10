const initialState = {
    isActiveDefaultLevelButton: true,
}
const defalutLevelButton = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEFAULT_LEVEL_BUTTON":
        state = {
            ...state,
            isActiveDefaultLevelButton: action.payload
        }
            break;
        default:
            return state
    }
    return state;
}

export default defalutLevelButton;