import React, { useContext,useEffect,useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FirebaseContext } from './context/firebase/firebaseContext';
import TodoForm from './TodoForm'


export default function Todo() {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    const {todos, fetchTodos, removeTodo,completeTodo,renameTodo}  = useContext(FirebaseContext)

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line
        
    }, [])


    const submitUpdate = value => {
        renameTodo(edit.id,value)
        setEdit({
            id:null,
            value:''
        })
    }

        if(edit.id){
            return <TodoForm edit={edit} onSubmit={submitUpdate}/>
        }
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
                    onClick={()=>setEdit({id:todo.id,value:todo.text})}
                    className='edit-icon'
                    />
                </div> 
            </div>
        ))
    )
}
