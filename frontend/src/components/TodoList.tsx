import React from "react";
import styled from "styled-components";
import handleDelete from "./handleDelete";
import { updateTodo } from '../utility/apiServices';


interface Todo {
    id: number;
    text: string;
    date: string;
    type: string;
    checked: number;
}

interface TodoListProps {
    data: Todo[];
    setData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const StyledTodo = styled.div`
  border: 1px solid blue;
`;
const StyledCheckbox = styled.input`
  margin-right: 5px;
`;

function TodoList({ data, setData }: TodoListProps) {

    const handleChange = async (id: number) => {
        const updatedData = data.map((todo) =>
            todo.id === id ? { ...todo, checked: todo.checked === 0 ? 1 : 0 } : todo
        );

        setData(updatedData);

        const updatedTodo = updatedData.find((todo) => todo.id === id) || {};
        await updateTodo(id, updatedTodo);
    };

    return (
        <>
            {data?.map((todo: Todo) => (
                <StyledTodo key={todo.id}>
                    <StyledCheckbox
                        type="checkbox"
                        checked={todo.checked === 1}
                        onChange={() => handleChange(todo.id)}
                    />
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
