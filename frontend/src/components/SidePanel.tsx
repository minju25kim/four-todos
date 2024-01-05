import styled from "styled-components";

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

function SidePanel() {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const todo = event.target.elements.todo.value;
    console.log(todo);
    //add todo in the todo list
    event.target.elements.todo.value = ''
  };

  return (
    <StyledSidePanel>
      <h1>SidePanel</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" required/>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      {/* todo list has the todos from db */}
    </StyledSidePanel>
  );
}

export default SidePanel;
