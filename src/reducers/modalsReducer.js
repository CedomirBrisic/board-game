const initialState = {
    defaultLevelModal: true,
    nextLevelModal: false,
    bustedLevelModal: false,
    gameOverModal: false
}
const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DEFAULT_LEVEL_MODAL":
            state = {
                ...state,
                defaultLevelModal: action.payload
            }
            // state.defaultLevelModal = action.payload
            break;
        case "SET_NEXT_LEVEL_MODAL":
            state = {
                ...state,
                nextLevelModal: action.payload
            }
            // state.nextLevelModal = action.payload
            break;
        case "SET_BUSTED_LEVEL_MODAL":
            state = {
                ...state,
                bustedLevelModal: action.payload
            }
            // state.bustedLevelModal = action.payload
            break;
        case "SET_GAMEOVER_LEVEL_MODAL":
            state = {
                ...state,
                gameOverModal: action.payload
            }
            // state.gameOverModal = action.payload
            break;
        default:
            return state
    }
    return state

}

export default modalsReducer;