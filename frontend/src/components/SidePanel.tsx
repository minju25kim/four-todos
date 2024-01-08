import styled from "styled-components";
import { Temporal } from "@js-temporal/polyfill";
import { useState, useEffect } from "react";

const StyledSidePanel = styled.div`
  border: 1px solid blue;
  grid-area: sidepanel;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  border: 1px solid green;
`;
const StyledButton = styled.button`
  border: 1px solid orange;
`;
const StyledTodo = styled.p`
  border: 1px solid blue;
`

interface Todo {
  id: number;
  text: string;
  date: string;
  // Add other properties as needed
}

function SidePanel() {
  const [data, setData] = useState<Todo[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const todo = { text: event.target.elements.todo.value, date: Temporal.Now.plainDateTimeISO() };
    fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then((result) => {
        console.log('Result:', result);
        event.target.elements.todo.value = '';
        fetchTodos();
      })
  };

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


  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <StyledSidePanel>
      <h1>SidePanel</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" required />
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      <div>
        {Array.isArray(data) &&
          data.map((todo) => {
            return <StyledTodo key={todo.id}>{todo?.text} </StyledTodo >
          })
        }

      </div>
    </StyledSidePanel>
  );
}

export default SidePanel;
