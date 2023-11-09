
import './App.css';
import { useState, useEffect } from "react";
import TodoList from './components/todolist';
import InputField from './components/inputfield';
import { useDispatch,useSelector } from 'react-redux';
import { addTodo, fetchTodos } from './store/todoSlice';


function App() {

const[texts, setText]=useState('')

const dispatch=useDispatch()

const addTask=()=>{dispatch(addTodo({texts})); setText('')}

const {status,error}=useSelector(state=>state.todos)

useEffect(()=>{dispatch(fetchTodos())},[dispatch])

  return (
<div className='App'>

<InputField
text={texts}
handleInput={setText} 
handleSubmit={addTask}
/>

<TodoList/>
{status==='loading'&&<h2>...loading</h2>}
{error&&<h2>error :{error}</h2>}
</div>
    )
}

export default App;
