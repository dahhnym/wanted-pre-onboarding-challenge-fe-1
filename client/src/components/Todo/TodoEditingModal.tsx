import styled from "styled-components";
import { TodoData } from "./TodoItem";
import React, { Dispatch, SetStateAction, useState } from "react";
import { updateTodo } from "../../utils/todo";
import {
  THEME_COLOR,
  TODO_CONTENT_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
} from "../../constants/todo";

interface Props {
  isModalOpen: boolean;
  data: TodoData;
  handleModalClose: Dispatch<SetStateAction<boolean>>;
  fetchTodoData: () => void;
}

interface BackdropProp {
  isOpen: boolean;
}

const TodoEditingModal: React.FC<Props> = ({
  isModalOpen,
  data,
  handleModalClose,
  fetchTodoData,
}) => {
  const initialState = {
    title: data.title,
    content: data.content,
  };

  const [todoInput, setTodoInput] = useState(initialState);
  const { title, content } = todoInput;

  const token = localStorage.getItem("token");

  const closeModalHandler = () => handleModalClose((prev) => !prev);

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput((prevTodoIput) => {
      return { ...prevTodoIput, title: e.target.value };
    });
  };

  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoInput((prevTodoIput) => {
      return { ...prevTodoIput, content: e.target.value };
    });
  };

  const checkTodoValidation = () => {
    if (title.length === 0) {
      alert("투두를 입력하세요");
      return false;
    }
    return true;
  };

  const submitNewTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = checkTodoValidation();
    if (token && isValid) {
      const responseStatus = await updateTodo(todoInput, token, data.id);
      if (responseStatus === 200) {
        alert("투두가 업데이트 되었습니다.");
        fetchTodoData();
        handleModalClose(false);
      }
    }
  };

  return (
    <Backdrop isOpen={isModalOpen}>
      <Modal>
        <Form onSubmit={submitNewTodoHandler}>
          <label>투두</label>
          <input
            type='text'
            value={title}
            maxLength={TODO_TITLE_MAX_LENGTH}
            onChange={changeTitleHandler}
          />
          <label>메모</label>
          <ContentInput
            rows={3}
            value={content}
            onChange={changeContentHandler}
            maxLength={TODO_CONTENT_MAX_LENGTH}
          />
          <ButtonWrapper>
            <ConfirmButton type='submit'>확인</ConfirmButton>
            <CancelButton onClick={closeModalHandler}>취소</CancelButton>
          </ButtonWrapper>
        </Form>
      </Modal>
    </Backdrop>
  );
};

export default TodoEditingModal;

const Backdrop = styled.div<BackdropProp>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  width: 350px;
  height: 210px;
  border-radius: 10px;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  input {
    margin-bottom: 0.5rem;
    height: 2rem;
  }
`;

const ContentInput = styled.textarea`
  resize: none;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.8rem;
  gap: 0.3rem;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const ConfirmButton = styled(ButtonStyle)`
  background-color: ${THEME_COLOR.BLUE};
  color: #fff;
`;

const CancelButton = styled(ButtonStyle)`
  background-color: ${THEME_COLOR.GRAY.LIGHT};
  color: ${THEME_COLOR.GRAY.DARK};
`;
