import styled from "styled-components";
import { Temporal } from "@js-temporal/polyfill";
import { useState, useEffect } from "react";
import { fetchTodo, postTodo, updateTodo, deleteTodo } from '../utility/apiServices';

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
const StyledTodo = styled.p`
  border: 1px solid blue;
`


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

  const handleDelete = async (type: string, id: number) => {
    try {
      await deleteTodo(id);
      const updatedData = await fetchTodo(type);
      setData(updatedData);
    } catch (error) {
      console.error('Error while submitting todo:', error);
    }
  }
  
  return (
    <StyledSidePanel>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" required />
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      <div >
        {
          data.map((todo) =>
            <StyledTodo key={todo.id}>
              {todo?.text}
              <button onClick={() => handleDelete(todo.type, todo.id)}>❎</button>
            </StyledTodo>
          )
        }
      </div>
    </StyledSidePanel>
  );
}

export default SidePanel;
