import React from "react";
import styled from "styled-components";
import handleDelete from "./handleDelete";

interface Todo {
    id: number;
    text: string;
    date: string;
    type: string;
}

interface TodoListProps {
    data: Todo[];
    setData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const StyledTodo = styled.p`
  border: 1px solid blue;
`;

function TodoList({ data, setData }: TodoListProps) {

    return (
        <>
            {data?.map((todo: Todo) => (
                <StyledTodo key={todo.id}>
                    {todo?.text}
                    <button onClick={() => handleDelete(todo.type, todo.id, setData)}>
                        ❎
                    </button>
                </StyledTodo>
            ))}
        </>
    );
}

export default TodoList;
