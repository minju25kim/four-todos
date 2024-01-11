import styled from "styled-components";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fetchTodo, postTodo, updateTodo, deleteTodo } from '../utility/apiServices';
import TodoList from "./TodoList";

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

  return (
    <StyledTodoContainer>
      {types.map((type, index) => (
        <div key={type}>
          <StyledTitle>{type}</StyledTitle>
          <TodoList data={list[index]} setData={stateSetters[type]} />
        </div>
      ))}
    </StyledTodoContainer>
  );
}

export default TodoContainer;

