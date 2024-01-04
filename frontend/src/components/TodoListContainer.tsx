import styled from "styled-components";
import TodoList from "./TodoList";
import SidePanel from "./SidePanel";

const StyledTodoListContainer = styled.div`
border: 1px solid red;
display: grid;
grid-template-areas:
  "sidepanel todolist todolist"
  "sidepanel todolist todolist";
padding: 10px;

`;


function TodoListContainer() {

  return (
    <StyledTodoListContainer>
      <SidePanel></SidePanel>
      <TodoList></TodoList>
      <TodoList></TodoList>
      <TodoList></TodoList>
      <TodoList></TodoList>
    </StyledTodoListContainer>
  );
}

export default TodoListContainer;
