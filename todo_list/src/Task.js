import React from "react";
import { useState } from "react";
import "./App.css";

const Task = ({ task, updateCallback, deleteCallback }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");

    /*
     * Applies the current state of edited text to the given task as referenced by
     * taskId.
     */
    function submitEdits(taskId) {
        task.text = editedText;

        setEditedText("");
        setIsEditing(false);
        updateCallback(task);
    }

    function deleteTask(taskId) {
        deleteCallback(task);
    }

    function toggleComplete(taskId) {
        task.completed = !task.completed;
        updateCallback(task);
    }

    return (
            <div>
            {isEditing ? (
                    <input type="text" onChange={(e) => setEditedText(e.target.value)} />
            ) : (
                    <div>{task.text}</div>
            )}
            <div className="todo-actions">
            {isEditing ? (
                    <button onClick={() => submitEdits(task.id)}>Submit Edit</button>
            ) : (
                    <>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <input type="checkbox" id="completed" checked={task.completed}
                onChange={() => toggleComplete(task.id)} />
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </>
            )}
        </div>
            </div>
    );
};

export default Task;
