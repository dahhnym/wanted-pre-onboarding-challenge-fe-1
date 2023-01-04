import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
  const [selectedId, setSelectedId] = useState("");

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
  }, []);

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

  const toggleTodoHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const value = e.currentTarget.pathname;
    const newValue = value.slice(1);
    setSelectedId(newValue);
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
          maxLength={100}
          placeholder='내용을 입력하세요'
          value={todoInput.content}
          onChange={contentChangeHandler}></textarea>
        <button>추가</button>
      </Form>
      <ul>
        {todoData &&
          todoData.map((data) => {
            return (
              <div key={data.id}>
                <li>
                  <Link to={`/${data.id}`} onClick={toggleTodoHandler}>
                    {data.title}
                  </Link>
                </li>
                {data.id === selectedId && <Outlet context={data.content} />}
              </div>
            );
          })}
      </ul>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
