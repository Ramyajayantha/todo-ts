import React, { useState } from "react";
import { Input, Button, List, Checkbox } from "antd";
import "../styles/TodoList.css";

const TodoList = () => {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  // State to hold the input text for adding new todos
  const [inputText, setInputText] = useState("");

  // Function to add a new todo
  const addTodo = () => {
    if (inputText.trim() !== "") {
      // Create a new todo object with a unique id
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      // Add the new todo to the list of todos
      setTodos([...todos, newTodo]);
      // Clear the input text
      setInputText("");
    }
  };

  // Function to toggle the completed status of a todo
  const toggleTodo = (id) => {
    // Create a new array of todos with the toggled completed status
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    // Update the list of todos
    setTodos(updatedTodos);
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    // Create a new array of todos excluding the deleted todo
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // Update the list of todos
    setTodos(updatedTodos);
  };
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      {/* Input field for adding new todos */}
      <Input
        className="todo-input"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {/* Button to add a new todo */}
      <Button className="add-button" type="primary" onClick={addTodo}>
        Add
      </Button>
      {/* Render each todo as a list item */}
      <List
        className="todo-list"
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item className={todo.completed ? "completed" : ""}>
            {/* Display the todo text */}
            {/* Button to toggle the completed status */}
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </Checkbox>
            {/* Button to delete the todo */}
            <Button
              className="delete-button"
              type="primary"
              danger
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
