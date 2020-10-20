import React from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

export default function TodoList() {


    return (
        <>
            <h1>What's the Plan for Today?</h1>
        <TodoForm />
        <Todo />
        </>
    )
}
