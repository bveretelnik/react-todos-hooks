import React, { useState, useContext} from 'react'
import { FirebaseContext } from './context/firebase/firebaseContext'

export default function TodoForm() {

    const [value, setValue] = useState('')

    const firebase  = useContext(FirebaseContext)


    // const inputRef = useRef(null)

    // useEffect(() => {
    //     inputRef.current.focus()
    // })

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


    return (
        <form className='todo-form'>
                <>
                <input
                placeholder='Add a todo'
                value={value}
                onChange={handleChange}
                name='text'
                className='todo-input'
                // ref={inputRef}
                />
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
                </button>
                </>
        </form>
    )
}
