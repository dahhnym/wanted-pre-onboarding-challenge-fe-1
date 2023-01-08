import { useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { getTodos } from "../../utils/todo";
import TodoItem, { TodoData } from "./TodoItem";

interface Props {
  setTodoData: Dispatch<SetStateAction<TodoData[]>>;
  todoData: TodoData[];
}

const TodoList: React.FC<Props> = ({ setTodoData, todoData }) => {
  const token = localStorage.getItem("token");

  const fetchTodoData = async () => {
    if (token) {
      const data = await getTodos(token);
      setTodoData(data);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  return (
    <List>
      {todoData &&
        todoData.map((data) => {
          return (
            <TodoItem key={data.id} fetchTodoData={fetchTodoData} data={data} />
          );
        })}
    </List>
  );
};

export default TodoList;

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`;
