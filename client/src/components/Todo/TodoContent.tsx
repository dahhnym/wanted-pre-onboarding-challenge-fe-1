import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

type TodoContentType = React.ReactNode;

const TodoContent = () => {
  const content = useOutletContext<TodoContentType>();

  return <Box>{content}</Box>;
};

export default TodoContent;

const Box = styled.div`
  color: #9393a0;
  font-size: 0.9rem;
  margin-left: 1.3rem;
  margin-top: 0.5rem;
  width: 100%;
`;
