import React, { useContext,useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FirebaseContext } from './context/firebase/firebaseContext';

export default function Todo() {


    const {todos, fetchTodos, removeTodo}  = useContext(FirebaseContext)

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line
    }, [])
 

    
    
    return (
        todos.map((todo,index) => (
            <div 
            className='todo-row'
            key={index}
            >
                <div key={todo.index} onClick={()=>console.log('hi')}>
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
