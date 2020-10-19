import React, {useReducer} from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { ADD_TODO, FETCH_TODOS, REMOVE_TODO, RENAME_TODO } from "../types"
import { firebaseReducer } from './firebaseReducer'
import Axios from 'axios'



const url = 'https://react-todos-hooks-63786.firebaseio.com'

export default function FirebaseState({children}) {

    const initialState = {
        notes: []
    }

const [state, dispatch] = useReducer(firebaseReducer, initialState)

const fetchTodos = async() =>{

    const res = await axios.get(`${url}/todos.json`)

    const payload = Object.keys(res.data).map(key => {
        return {
            ...res.data[key],
            id:key
        }
    })
    dispatch({
        type:FETCH_TODOS,
        payload
    })
}

    const addTodo = async text => {
        //......
    }

    const removeTodo = async id => {
        await axios.delete(`${url}/todos/${id}.json`)
        dispatch({
            type:RENAME_TODO,
            payload:id
        })
    }

    const renameTodo = id => {
        //.....
    }

    return (
        <FirebaseContext.Provider value={{
            fetchTodos,addTodo,removeTodo,renameTodo,
            todos:state.todos
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
