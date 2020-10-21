import React, {useReducer} from 'react'
import { FirebaseContext } from './firebaseContext'
import { ADD_TODO, FETCH_TODOS, REMOVE_TODO, RENAME_TODO,COMPLETED_TODO } from "../types"
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
            isCompleted: false
        }
        try{
            const res = await Axios.post(`${url}/todos.json`,todo)
            const payload = {
                ...todo,
                id:res.data.name
            }
            console.log('addTodo', state.todos)
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
        console.log('delete',id)
        dispatch({
            type:REMOVE_TODO,
            payload:id
        })

    } 

    const renameTodo = (todoId,newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        state.todos.map(item => (item.id ===todoId)? newValue : item)
        dispatch({
            type:RENAME_TODO,
            payload: newValue
        })
    }

    const completeTodo =  id => {
        console.log('toggle',state.todos)

        state.todos =  state.todos.map(todo => {
            if(todo.id === id) {
             todo.isCompleted = !todo.isCompleted;
            }
            return todo
        })

        
        dispatch({
            type:COMPLETED_TODO,
            payload:id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            fetchTodos, addTodo, removeTodo, renameTodo,completeTodo,
            todos:state.todos
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
