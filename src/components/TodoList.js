import React from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

export default function TodoList() {
 

// const updateTodo = (todoId,newValue) => {
//     if(!newValue.text || /^\s*$/.test(newValue.text)){
//         return
//     }
//     setTodos(prev=> prev.map(item=> (item.id ===todoId ? newValue : item)))

// }


    return (
        <>
            <h1>What's the Plan for Today?</h1>
        <TodoForm/>
        <Todo 
            // updateTodo={updateTodo}
        />
        </>
    )
}
