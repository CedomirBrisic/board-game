export const setDefaultLevelModal = (value) => {
    return {
        type: "SET_DEFAULT_LEVEL_MODAL",
        payload: value
    }
}
export const setNextLevelModal = (value) => {
    return {
        type: "SET_NEXT_LEVEL_MODAL",
        payload: value
    }
}
export const setBustedLevelModal = (value) => {
    return {
        type: "SET_BUSTED_LEVEL_MODAL",
        payload: value
    }
}
export const setGameOverModal = (value) => {
    return {
        type: "SET_GAMEOVER_LEVEL_MODAL",
        payload: value
    }
}