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
  function submit(formData: any) {
    console.log(formData);
  }

  return (
    <StyledSidePanel>
      <h1>SidePanel</h1>
      <StyledForm action={submit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" />
        <label htmlFor="priority">Choose a priority: </label>
        <select id="priority" name="priority">
          <option value="do">do</option>
          <option value="decide">decide</option>
          <option value="delete">delete</option>
          <option value="delegate">delegate</option>
        </select>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </StyledSidePanel>
  );
}

export default SidePanel;
