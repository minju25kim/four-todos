import styled from "styled-components";

interface SidePanelProps {
  handleSubmit: any;
  data: any;
  className: string;
  handleDragStart: any;
  handleDragEnter: any;
  handleDragOver: any;
  handleDragLeave: any;
  handleDrop: any;
  setDraggedItem: any;
}

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

function SidePanel({
  handleSubmit,
  data,
  className,
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  setDraggedItem,
}: SidePanelProps) {

  return (
    <StyledSidePanel
      className={className}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(event) => handleDrop(event, 'sidepanel')}
    >
      <h1>SidePanel</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput placeholder="anything,,," type="text" name="todo" required />
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      <div>
        {Array.isArray(data) &&
          data.map((todo) =>
            <StyledTodo key={todo.id}
              className="draggable"
              draggable
              onDragStart={() => handleDragStart(todo)}
              onDragEnd={() => setDraggedItem(null)}>
              {todo?.text}
            </StyledTodo >
          )
        }
      </div>
    </StyledSidePanel >
  );
}

export default SidePanel;
