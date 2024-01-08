import styled from "styled-components";
import TodoList from "./TodoList";
import SidePanel from "./SidePanel";
import { Temporal } from "@js-temporal/polyfill";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  date: string;
  // Add other properties as needed
}

interface Item {
  id: number;
  text: string;
  date: string;
  type: string;
  // Add other properties as needed
}

const StyledTodoListContainer = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-areas:
    "sidepanel todolist todolist"
    "sidepanel todolist todolist";
  padding: 10px;
  @media (max-width: 900px) {
    grid-template-areas:
    "sidepanel todolist"
    "sidepanel todolist"
    "sidepanel todolist"
    "sidepanel todolist"
    ;
  }
`;


function TodoListContainer() {
  const [data, setData] = useState<Todo[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const todoInput = target.elements.namedItem('todo') as HTMLInputElement;

    const json = { text: todoInput.value, date: Temporal.Now.plainDateTimeISO(), type: 'sidepanel' };
    postTodo(json)
    todoInput.value = '';
  };

  // db related
  const postTodo = (json: any) => {
    fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((result) => {
        console.log('Result:', result);
        fetchTodos();
      })

  }

  const fetchTodos = () => {
    fetch('http://localhost:8080/todo', {
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

  const updateTodo = (target: any, id: any) => {
    const json = { type: target }
    console.log(json)
    fetch(`http://localhost:8080/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
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
        console.error('There was a problem with the UPDATE request:', error);
      });
  };

  // initial load of data
  useEffect(() => {
    fetchTodos();
  }, []);

  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  const handleDragStart = (item: Item) => {
    console.log('handle drag start', item)
    setDraggedItem(item);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    console.log('handle drag enter', target)
    if (target.classList) {
      target.classList.add('drag-over');
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    console.log('Hanlde drag leave', target)
    if (target.classList) {
      target.classList.remove('drag-over');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, target: string) => {
    event.preventDefault();

    const dropTarget = event.currentTarget as HTMLDivElement;
    dropTarget.classList.remove('drag-over');

    const id = draggedItem && draggedItem?.id

    updateTodo(target, id);

    console.log('Item dropped:', draggedItem, 'Target-area:', target);
    setDraggedItem(null);
  };

  const types = ['do', "delete", "decide", "delegate"]
  return (
    <StyledTodoListContainer >
      <SidePanel
        handleSubmit={handleSubmit}
        data={data}
        className="drop-area"
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        setDraggedItem={setDraggedItem}
      />
      {types.map((type) =>
        <TodoList
          key={type}
          type={type}
          className="drop-area"
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          setDraggedItem={setDraggedItem}
        />)}
    </StyledTodoListContainer>
  );
}

export default TodoListContainer;
