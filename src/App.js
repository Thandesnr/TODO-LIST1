import React,{ useState,useRef,useEffect } from "react";
import TodoList from "./TodoList";
import {v4 as uuid} from 'uuid'

function App() {
 const [todos,setTodos] = useState([]);
 const inputRef = useRef();

 const LOCAL_STORAGE_KEY = "todoapp"

 const storeTodos = (todos)=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  setTodos(todos)
 }

 useEffect(() =>{ 
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if(storedTodos){
    setTodos(storedTodos)} 
  }, [])
 

function toggleTodo(id){
  const newTodos= [...todos]
const todo = newTodos.find(todo => todo.id === id)
todo.complete = !todo.complete
setTodos(newTodos)
}

 function handleAdd(e) {
 const name = inputRef.current.value;
 if(name === "")return 
 storeTodos((prevTodos) => {
    return [...prevTodos,{id:uuid(),name:name,complete:false}]
 })
 
 inputRef.current.value = null;
  }
 
function handleClearTodos(){
const newTodos = todos.filter(todo=>!todo.complete)
setTodos(newTodos)
}
  


  return (
  <>
  <h1>Chores!!</h1>
    <TodoList todo={todos} toggleTodo ={toggleTodo} />
  <input ref={inputRef} type="text" />
  <button onClick ={handleAdd}>Add todo</button>
  <button onClick={handleClearTodos}>Clear todo </button>
  <div> {todos.filter(todo => !todo.complete).length} left todo</div>
       
</>
  )

  }
export default App;
