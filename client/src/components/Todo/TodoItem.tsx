import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo } from "../../utils/todo";
import { useState } from "react";
import TodoEditingModal from "./TodoEditingModal";

export interface TodoData {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

interface Props {
  data: TodoData;
  fetchTodoData: () => void;
}

const TodoItem: React.FC<Props> = ({ data, fetchTodoData }) => {
  const token = localStorage.getItem("token");

  const [selectedId, setSelectedId] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleTodoHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const value = e.currentTarget.pathname;
    const newValue = value.slice(1);
    setSelectedId(newValue);
    setIsShow((prev) => !prev);
  };

  const deleteTodoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isConfirmedToDelete = window.confirm("삭제 하시겠습니까?");
    if (isConfirmedToDelete) {
      const todoIdToDelete = e.currentTarget.value;
      if (token) {
        deleteTodo(token, todoIdToDelete);
        fetchTodoData();
      }
    } else {
      return;
    }
  };

  const editTodoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked todo id", e.currentTarget.value);
    const selectedTodoId = e.currentTarget.value;
    setIsEditing((prev) => !prev);
    setEditTodoId(selectedTodoId);
  };

  return (
    <ListItem>
      <Wrapper>
        <input className='todo-item-checkbox' type='checkbox' name='todo' />
        <Link
          className='todo-item-title'
          to={`/${data.id}`}
          onClick={toggleTodoHandler}>
          <label htmlFor='todo'>{data.title}</label>
        </Link>
      </Wrapper>
      {data.id === selectedId && isShow && <Outlet context={data.content} />}
      <button onClick={editTodoHandler} value={data.id}>
        수정
      </button>
      <button onClick={deleteTodoHandler} value={data.id}>
        삭제
      </button>
      {isEditing && data.id === editTodoId && (
        <TodoEditingModal
          isModalOpen={isEditing}
          handleModalClose={setIsEditing}
          data={data}
        />
      )}
    </ListItem>
  );
};

export default TodoItem;

const ListItem = styled.li`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  .todo-item-title {
    text-decoration: none;
    &:active {
      color: initial;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .todo-item-checkbox:checked + .todo-item-title {
    text-decoration: line-through;
  }
`;
