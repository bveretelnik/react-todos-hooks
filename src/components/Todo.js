import React, { useContext,useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FirebaseContext } from './context/firebase/firebaseContext';

export default function Todo() {

    const {todos, fetchTodos, removeTodo,completeTodo}  = useContext(FirebaseContext)

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line
        
    }, [])
 
    // const toggleTodoCompleteAtIndex = id => {
    //     return todos.map(todo=>{
    //         if(todo.id === id){
    //         todo.isCompleted = !todo.isCompleted
    //         }
    //     })
        
    // } 

    return (
        todos.map((todo,index) => (
            <div 
            className='todo-row'
            key={index}
            >
                <div key={todo.index} onClick={()=>completeTodo(todo.id)} className={todo.isCompleted ? 'todo-completed': ''}>
                    {todo.text}
                </div>
                <div className='icons'>
                    <RiCloseCircleLine 
                        onClick={()=>removeTodo(todo.id)}
                        className='delete-icon'
                    />
                    <TiEdit 
                    onClick={()=>console.log('hell')}
                    className='edit-icon'
                    />
                </div> 
            </div>
        ))
    )
}
