import React, { useState, useContext} from 'react'
import { FirebaseContext } from './context/firebase/firebaseContext'

export default function TodoForm(props) {

    const [value, setValue] = useState(props.edit ? props.edit.value : '')

    const firebase  = useContext(FirebaseContext)


    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (value.trim()) {
            firebase.addTodo(value.trim()).then(() => {
              console.log('Заметка была создана', 'success')
            }).catch(() => {
                console.log('Что-то пошло не так', 'danger')
            })
            setValue('')
          } else {
            console.log('Введите название заметки')
          }
}

const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
      }
      setValue(prev => prev.map(item => (item.id === todoId ? newValue : item)));
      firebase.renameTodo(newValue.trim().then(()=>{
          console.log('rename')
      }).catch(()=> {
          console.log('Some error')
      }))
      
    };
  
    return (
        <form className='todo-form'>
            {props.edit ? (
                <>
                <input
                placeholder='Update your item'
                value ={value}
                onChange={handleChange}
                name='text'
                className='todo-input edit'
                />
                <button onClick={()=>updateTodo(props.edit.id,props.edit.value)} className='todo-button edit'>
                    Update
                </button>
                </>
            ):(
                <>
                <input
                placeholder='Add a todo'
                value={value}
                onChange={handleChange}
                name='text'
                className='todo-input'
                />
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
                </button>
                </>
            )}
                
        </form>
    )
}
