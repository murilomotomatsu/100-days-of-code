import { useState, useEffect } from "react"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Calendar100Days from "./Calendar";

import "./Todo.css"

/* Component */
export default function Todo ({ editable }) {
    const [title, setTitle] = useState('To-do list');
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [focusedTodo, setFocusedTodo] = useState(null);
    const [date, setDate] = useState(new Date())

    /* Load Existing to-dos */
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    /* Add to-do in local storage */
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    /* Add a new To-do in list */
    const addNewTodo = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setTodos([ ...todos, { text: newTodo, completed: false}]);
            setNewTodo('');
        }
    }

    /* Remove a To-do */
    const removeTodo = (index) =>{
        const updateTodos = todos.filter((_, i) => i !== index);
        setTodos(updateTodos)
        setFocusedTodo(null)
    }

    /* Toggle check box */
    const toggleCheckBox = (index) => {
        const updateTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updateTodos);
    };

    /* Update an existant to-do */
    const updateTodo = (index, e) => {
        const updatedTodos = [ ...todos ];
        updatedTodos[index].text = e.target.value;
        setTodos(updatedTodos);
    }

    /* Check if the next focused */
    const handleBlur = (e, index) => {
        const currentTodoItem = e.currentTarget.closest(".todo-item");
        const relatedTarget = e.relatedTarget;
    
        if (relatedTarget && currentTodoItem.contains(relatedTarget)) {
          return;
        }
    
        setFocusedTodo(null);
      };


    return(
        <>  
            {/* To-do Container */}
            <div className="todo">
                <div className="todo-header">
                    {/* Title */}
                    {editable ? (
                        <input 
                            type="text" 
                            className="todo-title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={!editable}
                        />                
                    ) : (
                        <input 
                            type="text" 
                            className="todo-title" 
                            value="100-days-of-code"
                            disabled={!editable}
                        />                     
                    )}

                    {/* Datepicker */}
                    {!editable ? (
                        <DatePicker
                            selected='Oct 18'
                            dateFormat='MMM/dd'
                            popperPlacement="left"
                            className='datePicker'
                            disabled={!editable}                      
                            
                        />              
                    ):(
                        <DatePicker
                            selected={date}
                            dateFormat='MMM/dd'
                            popperPlacement="left"
                            onChange={(date) => setDate(date)}
                            className='datePicker'
                            disabled={!editable}                      
                            
                        />   
                    )}
                </div>

                {/* To-do List */}
                <ul className="todo-list">
                {editable ? (
                        todos.map((todo, index) => (
                            <li className="todo-item" key={index}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleCheckBox(index)}
                                    disabled={!editable}

                                />
                                <textarea
                                    value={todo.text}
                                    onChange={(e) => updateTodo(index, e)} 
                                    onFocus={() => setFocusedTodo(index)}
                                    onBlur={(e) => handleBlur(e, index)}
                                    disabled={!editable}
                                    className="todo-textarea"
                                    rows={1}
                                />

                                {/* Remove Button only in selected */}
                                {focusedTodo === index && (
                                    <button onClick={() => removeTodo(index)}>
                                        Remove
                                    </button>
                                )}
                            </li>
                        ))
                    ) : (
                        /* 100 days of code calendar */
                        <Calendar100Days/>
                    )}
                </ul>

                {/* Input New To-do */}
                <input
                    type="text" 
                    value={newTodo}
                    onKeyDown={addNewTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder={editable ? "Tap to add new to-do" : "Tap to see commit changes"}
                    disabled={!editable}
                />

            </div>        
        </>
    )
}