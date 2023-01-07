import styled from "styled-components";
import { TodoData } from "./TodoItem";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isModalOpen: boolean;
  data: TodoData;
  handleModalClose: Dispatch<SetStateAction<boolean>>;
}

interface BackdropProp {
  isOpen: boolean;
}

const TodoEditingModal: React.FC<Props> = ({
  isModalOpen,
  data,
  handleModalClose,
}) => {
  const closeModalHandler = () => handleModalClose((prev) => !prev);

  return (
    <Backdrop isOpen={isModalOpen}>
      <Modal>
        <Form action=''>
          <label htmlFor=''>투두</label>
          <input type='text' value={data.title} />
          <label htmlFor=''>메모</label>
          <ContentInput rows={3} value={data.content} />
          <button>확인</button>
          <button onClick={closeModalHandler}>취소</button>
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
  width: 300px;
  height: 200px;
  border-radius: 10px;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.9rem;
    color: #9393a0;
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
