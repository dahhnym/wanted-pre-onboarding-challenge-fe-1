import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, Outlet } from "react-router-dom";
import { getTodos } from "../../utils/todo";

export interface TodoData {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

interface Props {
  setTodoData: Dispatch<SetStateAction<TodoData[]>>;
  todoData: TodoData[];
}

const TodoList: React.FC<Props> = ({ setTodoData, todoData }) => {
  const token = localStorage.getItem("token");

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (token) {
      const fetchTodoData = async () => {
        const data = await getTodos(token);
        setTodoData(data);
      };

      fetchTodoData();
    }
  }, []);

  const toggleTodoHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const value = e.currentTarget.pathname;
    const newValue = value.slice(1);
    setSelectedId(newValue);
  };
  return (
    <ul>
      {todoData &&
        todoData.map((data) => {
          return (
            <div key={data.id}>
              <li>
                <input type='checkbox' name='todo' />
                <Link to={`/${data.id}`} onClick={toggleTodoHandler}>
                  <label htmlFor='todo'>{data.title}</label>
                </Link>
              </li>
              {data.id === selectedId && <Outlet context={data.content} />}
              <button>수정</button>
              <button>삭제</button>
            </div>
          );
        })}
    </ul>
  );
};

export default TodoList;
