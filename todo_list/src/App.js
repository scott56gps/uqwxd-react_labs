import React from "react";
import Task from "./Task";
import "./App.css";

const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    /*
     * A stateful function that takes the current state of todo, and adds it to
     * todos
     */
    function handleSubmit(e) {
        e.preventDefault();

        const trimmedTodo = todo.trim();
        if (trimmedTodo.length > 0) {
            const newTodo = {
                id: new Date().getTime(),
                text: trimmedTodo,
                completed: false,
            };

            setTodos([...todos].concat(newTodo));
        } else {
            alert("Enter Valid Task");
        }

        setTodo("");
    }

    function handleDelete(task) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== task.id);
        setTodos(updatedTodos);
    }

    function handleUpdate(task) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === task.id) {
                todo = task;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    return (
        <div className ="App">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type ="text"
              onChange={(e) => setTodo(e.target.value)} // Every time the value is changed, we setTodo
              placeholder="Add a new task"
              value={todo}
            />
            <button type ="submit">Add Todo</button>
          </form>
          {todos.map((todo) =>
              <Task task={todo} updateCallback={handleUpdate} deleteCallback={handleDelete}/>
          )}
        </div>
    );
};

export default App;
