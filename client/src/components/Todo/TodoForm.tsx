import { createTodo, getTodos } from "../../utils/todo";
import styled from "styled-components";
import React, { useState, Dispatch, SetStateAction } from "react";
import { TodoData } from "../../pages/todo";
import {
  TODO_CONTENT_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
} from "../../constants/todo";

interface Props {
  setTodoData: Dispatch<SetStateAction<TodoData[]>>;
}

const TodoForm: React.FC<Props> = ({ setTodoData }) => {
  const token = localStorage.getItem("token");

  const initialTodoInputState = { title: "", content: "" };

  const [todoInput, setTodoInput] = useState(initialTodoInputState);

  const { title, content } = todoInput;

  const checkTodoValidation = () => {
    if (title === "") {
      alert("투두를 입력하세요");
      return;
    }
  };

  const fetchTodoData = async () => {
    if (token) {
      const data = await getTodos(token);
      setTodoData(data);
    }
  };

  const createTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      checkTodoValidation();
      createTodo(todoInput, token);
      fetchTodoData();
    }
    setTodoInput(initialTodoInputState);
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
    <Form onSubmit={createTodoHandler}>
      <Label htmlFor=''>투두</Label>
      <TitleInput
        type='text'
        name='title'
        value={title}
        onChange={titleChangeHandler}
        maxLength={TODO_TITLE_MAX_LENGTH}
        placeholder='최대 25글자'
      />
      <Label htmlFor='content'>메모</Label>
      <ContentInput
        name='content'
        id=''
        rows={3}
        maxLength={TODO_CONTENT_MAX_LENGTH}
        placeholder='내용을 입력하세요. 최대 100글자'
        value={content}
        onChange={contentChangeHandler}></ContentInput>
      <SubmitBtn>추가</SubmitBtn>
    </Form>
  );
};

export default TodoForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  color: #888888;
  margin-bottom: 0.5rem;
`;

const TitleInput = styled.input`
  height: 2rem;
  border: solid 1px #ebebeb;
  border-radius: 5px;
  padding-left: 0.5rem;
  margin-bottom: 0.8rem;
`;

const ContentInput = styled.textarea`
  border: solid 1px #ebebeb;
  border-radius: 5px;
  resize: none;
  padding: 0.5rem;
`;

const SubmitBtn = styled.button`
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #3366ff;
  color: #fff;
  height: 35px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
