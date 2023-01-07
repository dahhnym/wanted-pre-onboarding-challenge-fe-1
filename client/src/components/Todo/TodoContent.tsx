import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

type TodoContentType = React.ReactNode;

type BackdropProp = {
  isModalClosed: boolean;
};

const TodoContent = () => {
  const content = useOutletContext<TodoContentType>();

  const [isModalClosed, setIsModalClosed] = useState(false);

  const modalCloseHandler = () => setIsModalClosed((prev) => !prev);

  return (
    <Backdrop isModalClosed={isModalClosed}>
      <Modal>
        {content}
        <button>수정</button>
        <button onClick={modalCloseHandler}>닫기</button>
      </Modal>
    </Backdrop>
  );
};

export default TodoContent;

const Backdrop = styled.div<BackdropProp>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  display: ${(props) => (props.isModalClosed ? "none" : "flex")};
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;
