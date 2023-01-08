import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Signout from "../../components/Auth/Signout";
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
      <Signout />
      <Heading>Todo</Heading>
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

const Heading = styled.h1`
  margin: 2rem 0;
  text-align: center;
`;
