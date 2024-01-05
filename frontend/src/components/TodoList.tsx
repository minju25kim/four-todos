import styled from "styled-components";

const StyledTodoList = styled.div`
  border: 1px solid black;
  width: 500px;
  height: 500px;
`;

function TodoList() {
  return <StyledTodoList>TodoList</StyledTodoList>;
}

export default TodoList;
