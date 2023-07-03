import React, { useState } from "react";
import { Input, Button, List, Checkbox } from "antd";
import "../styles/TodoList.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <Input
        className="todo-input"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button className="add-button" type="primary" onClick={addTodo}>
        Add
      </Button>
      <List
        className="todo-list"
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item className={todo.completed ? "completed" : ""}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </Checkbox>
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
