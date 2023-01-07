import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoForm from "../../components/Todo/TodoForm";
import TodoList from "../../components/Todo/TodoList";

export interface TodoData {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

const Todo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [todoData, setTodoData] = useState<Array<TodoData>>([]);

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/auth");
    }
  }, [navigate, token]);

  return (
    <Container>
      <h1>Todo</h1>
      <TodoForm setTodoData={setTodoData} />
      <TodoList setTodoData={setTodoData} todoData={todoData} />
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
