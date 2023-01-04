import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createTodo, getTodos } from "../../utils/todo";

interface TodoData {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

const Todo = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [todoInput, setTodoInput] = useState({ title: "", content: "" });
  const [todoData, setTodoData] = useState<Array<TodoData>>([]);

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/auth");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      const fetchTodoData = async () => {
        const data = await getTodos(token);
        setTodoData(data);
      };
      fetchTodoData();
    }
  });

  const createTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      await createTodo(todoInput, token);
    }
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoInput((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  return (
    <Container>
      <h1>Todo</h1>
      <Form onSubmit={createTodoHandler}>
        <label htmlFor='title'>투두</label>
        <input
          type='text'
          name='title'
          value={todoInput.title}
          onChange={titleChangeHandler}
        />
        <label htmlFor='content'>내용</label>
        <textarea
          name='content'
          id=''
          cols={30}
          rows={10}
          placeholder='내용을 입력하세요'
          value={todoInput.content}
          onChange={contentChangeHandler}></textarea>
        <button>추가</button>
      </Form>
      <ul>
        {todoData &&
          todoData.map((data) => {
            return <li key={data.id}>{data.title}</li>;
          })}
      </ul>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  border: solid 1px blue;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  border: solid 1px lavender;
  display: flex;
  flex-direction: column;
`;
