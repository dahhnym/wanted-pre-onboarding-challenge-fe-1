import { useOutletContext } from "react-router-dom";

type TodoContentType = React.ReactNode;

const TodoContent = () => {
  const content = useOutletContext<TodoContentType>();

  return <li>{content}</li>;
};

export default TodoContent;
