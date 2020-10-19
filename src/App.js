import React from 'react';
import './App.css';
import FirebaseState from './components/context/firebase/FirebaseState';
import TodoList from './components/TodoList';

function App() {
  return (
    <FirebaseState>
    <div className="todo-app">
      <TodoList/>
    </div>
    </FirebaseState>
  );
}

export default App;
