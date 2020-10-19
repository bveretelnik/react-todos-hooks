import { ADD_TODO, FETCH_TODOS, REMOVE_TODO, RENAME_TODO } from "../types"


const handlers = {
    [ADD_TODO]: state => ({...state}),
    [FETCH_TODOS]: (state,{payload}) => ({
        state,
        notes: [state.notes,payload]
    }),
    [REMOVE_TODO]: (state,{payload}) => ({...state,notes:state.notes.filter(note => note.id !==payload)}),
    [RENAME_TODO]: (state,{payload}) => ({...state,note:payload}),
    DEFAULT: state => state
}

export const firebaseReducer = (state,action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state,action)
}