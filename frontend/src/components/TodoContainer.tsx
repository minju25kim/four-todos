import styled from "styled-components";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fetchTodo } from '../utility/apiServices';
import TodoList from "./TodoList";

interface Todo {
  id: number;
  text: string;
  date: string;
  type: string;
  checked: number;
}

const StyledTodoContainer = styled.div`
  border: 1px solid black;
  width: 500px;
  min-height: 100px;
  `;
const StyledTitle = styled.div`
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

  const getChecked = (array: any) => {
    return array.filter((el: any) => el.checked === 1).length;
  }

  return (
    <StyledTodoContainer>
      {types.map((type, index) => (
        <div key={type}>
          <StyledTitle>
            <h3>{type}</h3>
            <span>{getChecked(list[index])}/{list[index].length}</span>
          </StyledTitle>
          <TodoList data={list[index]} setData={stateSetters[type]} />
        </div>
      ))}
    </StyledTodoContainer>
  );
}

export default TodoContainer;

