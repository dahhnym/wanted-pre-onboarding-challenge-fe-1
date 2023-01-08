import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo } from "../../utils/todo";
import { useState } from "react";
import TodoEditingModal from "./TodoEditingModal";
import { THEME_COLOR } from "../../constants/todo";

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
          <TodoTitle htmlFor='todo'>{data.title}</TodoTitle>
        </Link>
        {data.id === selectedId && isShow && <Outlet context={data.content} />}
      </Wrapper>
      <div>
        <EditButton onClick={editTodoHandler} value={data.id}>
          수정
        </EditButton>
        <DeleteButton onClick={deleteTodoHandler} value={data.id}>
          삭제
        </DeleteButton>
      </div>
      {isEditing && data.id === editTodoId && (
        <TodoEditingModal
          isModalOpen={isEditing}
          handleModalClose={setIsEditing}
          data={data}
          fetchTodoData={fetchTodoData}
        />
      )}
    </ListItem>
  );
};

export default TodoItem;

const ListItem = styled.li`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  & + li {
    border-top: solid 1px ${THEME_COLOR.GRAY.LIGHT};
    padding-top: 1rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
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

const TodoTitle = styled.label`
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: solid 1px ${THEME_COLOR.GRAY.LIGHT};
  padding: 0.3rem 1rem;
  border-radius: 15px;
  color: ${THEME_COLOR.GRAY.DARK};
  font-weight: bold;
  float: right;
`;

const EditButton = styled(Button)`
  margin-bottom: 0.3rem;
  &:hover {
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    border: solid 1px ${THEME_COLOR.BLUE};
    color: ${THEME_COLOR.BLUE};
  }
`;

const DeleteButton = styled(Button)`
  &:hover {
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    border: solid 1px ${THEME_COLOR.RED};
    color: ${THEME_COLOR.RED};
  }
`;
