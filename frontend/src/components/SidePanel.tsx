import styled from "styled-components";
import { Temporal } from "@js-temporal/polyfill";
import { useState, useEffect } from "react";
import { fetchTodo, postTodo, updateTodo, deleteTodo } from '../utility/apiServices';
import TodoList from "./TodoList";

interface Todo {
  id: number;
  text: string;
  date: string;
  type: string;
}

const StyledSidePanel = styled.div`
  border: 1px solid red;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
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

function SidePanel() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo('todo').then((data) => setData(data))
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const target = event.target.elements.namedItem('todo')
    const json = { text: target.value, date: Temporal.Now.plainDateTimeISO(), type: 'todo' };
    try {
      await postTodo(json);
      const updatedData = await fetchTodo('todo');
      setData(updatedData);
      target.value = '';
    } catch (error) {
      console.error('Error while submitting todo:', error);
    }
  };

  return (
    <StyledSidePanel>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" required />
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      <TodoList data={data} setData={setData} />

    </StyledSidePanel>
  );
}

export default SidePanel;
