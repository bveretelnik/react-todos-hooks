import React, {useReducer} from 'react'
import { FirebaseContext } from './firebaseContext'
import { ADD_TODO, FETCH_TODOS, REMOVE_TODO, RENAME_TODO } from "../types"
import { firebaseReducer } from './firebaseReducer'
import Axios from 'axios'



const url = process.env.REACT_APP_DB_URL

export default function FirebaseState({children}) {

    const initialState = {
        todos: []
    }

const [state, dispatch] = useReducer(firebaseReducer, initialState)

const fetchTodos = async() =>{

    const res = await Axios.get(`${url}/todos.json`)

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
        const todo = {
            text,
            key: Math.floor(Math.random() * 10000)
        }
        try{
            const res = await Axios.post(`${url}/todos.json`,todo)
            const payload = {
                ...todo,
                id:res.data.name
            }
            console.log('addTodo', res.data)
            dispatch({
                type:ADD_TODO,
                payload
            })
        }catch(e){
            throw new Error(e.message)
        }
    }

    const removeTodo = async id => {
        await Axios.delete(`${url}/todos/${id}.json`)
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
            fetchTodos, addTodo, removeTodo, renameTodo,
            todos:state.todos
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
