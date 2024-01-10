import styled from "styled-components";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fetchTodo, postTodo, updateTodo, deleteTodo } from '../utility/apiServices';

interface Todo {
  id: number;
  text: string;
  date: string;
  type: string;
}

const StyledTodoContainer = styled.div`
  border: 1px solid black;
  width: 500px;
  min-height: 100px;
  `;
const StyledTitle = styled.h3`
    border: 1px solid pink;
  `;
const StyledTodo = styled.p`
    border: 1px solid blue;
  `;

function TodoContainer() {
  const [doList, setDoList] = useState<Todo[]>([]);
  const [deleteList, setDeleteList] = useState<Todo[]>([]);
  const [delegateList, setDelegateList] = useState<Todo[]>([]);
  const [decideList, setDecideList] = useState<Todo[]>([]);

  const types = ["do", "delete", "delegate", "decide"];
  const stateSetters: { [key: string]: Dispatch<SetStateAction<Todo[]>> } = {
    do: setDoList,
    delete: setDeleteList,
    delegate: setDelegateList,
    decide: setDecideList,
  };

  const list = [doList, deleteList, delegateList, decideList];

  useEffect(() => {
    types.forEach((type) => {
      fetchTodo(type).then((res) => {
        stateSetters[type](res); 
      });
    });
  }, []);

  const handleDelete = async (type: string, id: number) => {
    try {
      await deleteTodo(id);
      const updatedData = await fetchTodo(type);
      stateSetters[type](updatedData); // Update state dynamically
    } catch (error) {
      console.error('Error while deleting todo:', error);
    }
  };

  return (
    <StyledTodoContainer>
      {types.map((type, index) => (
        <div key={type}>
          <StyledTitle>{type}</StyledTitle>
          {list[index].map((todo) => (
            <StyledTodo key={todo.id}>
              {todo?.text}
              <button onClick={() => handleDelete(todo.type, todo.id)}>❎</button>
            </StyledTodo>
          ))}
        </div>
      ))}
    </StyledTodoContainer>
  );
}

export default TodoContainer;

