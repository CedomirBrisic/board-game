export const setStartLevel = (value) => {
    return {
        type: "SET_START_LEVEL",
        payload: value
    }
}
export const setLevel = (value) => {
    return {
        type: "SET_LEVEL",
        payload: value
    }
}
export const setLevelReached = (value) => {
    return {
        type: "SET_LEVEL_REACHED",
        payload: value
    }
}