import { ADD_TODO, COMPLETED_TODO, FETCH_TODOS, REMOVE_TODO, RENAME_TODO } from "../types"


const handlers = {
    [ADD_TODO]: (state,{payload}) => ({
        ...state,
        todos:[...state.todos,payload]
    }),
    [FETCH_TODOS]: (state,{payload}) => ({
        state,
        todos: payload
    }),
    [REMOVE_TODO]: (state,{payload}) => ({
        ...state, 
        todos:state.todos.filter(todo => todo.id !== payload)
    }),
    [RENAME_TODO]: (state,{payload}) => ({
        ...state,
        
    }),
    [COMPLETED_TODO]: state => ({
            ...state   
    }),
    DEFAULT: state => state
}

export const firebaseReducer = (state,action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state,action)
}