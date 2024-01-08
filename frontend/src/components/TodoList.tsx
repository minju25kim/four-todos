import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledTodoList = styled.div`
  border: 1px solid black;
  width: 500px;
  min-height: 100px;
  `;
  const StyledTitle = styled.h3`
    border: 1px solid pink;
  `
const StyledTodo = styled.p`
  border: 1px solid blue;
  `

interface TodoListProps {
  type: string;
  className: string;
  handleDragStart: any;
  handleDragEnter: any;
  handleDragOver: any;
  handleDragLeave: any;
  handleDrop: any;
  setDraggedItem: any;
}

interface Todo {
  id: number;
  text: string;
  date: string;
  // Add other properties as needed
}

function TodoList({
  type,
  className,
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  setDraggedItem,
}: TodoListProps) {
  const [data, setData] = useState<Todo[]>([]);

  const fetchTodos = () => {
    fetch(`http://localhost:8080/todo/${type}`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.todos);
        console.log('Data received:', data); // Log the data received from the server
      })
      .catch(error => {
        console.error('There was a problem with the GET request:', error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <StyledTodoList
      className={className}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(event) => handleDrop(event, type)}
    >
     <StyledTitle>{type}</StyledTitle>
      <div>
        {Array.isArray(data) &&
          data.map((todo) =>
            <StyledTodo
              key={todo.id}
              className="draggable"
              draggable
              onDragStart={() => handleDragStart(todo)}
              onDragEnd={() => setDraggedItem(null)}>
              {todo?.text}
            </StyledTodo >
          )
        }
      </div>
    </StyledTodoList >);
}

export default TodoList;
