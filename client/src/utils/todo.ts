import axios from "axios";

interface TodoProps {
  title: string;
  content: string;
}

export const createTodo = (todoInput: TodoProps, token: string) => {
  axios
    .post(
      "http://localhost:8080/todos",
      {
        title: todoInput.title,
        content: todoInput.content,
      },
      {
        headers: {
          Authorization: `login ${token}`,
        },
      }
    )
    .then((res) => console.log("createTodo res", res));
};

export const getTodos = async (token: string) => {
  return await axios
    .get("http://localhost:8080/todos", {
      headers: {
        Authorization: `login ${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    });
};

export const deleteTodo = async (token: string, id: string) => {
  return await axios.delete(`http://localhost:8080/todos/${id}`, {
    headers: {
      Authorization: `login ${token}`,
    },
  });
};

export const updateTodo = async (
  todoInput: TodoProps,
  token: string,
  id: string
) => {
  return await axios
    .put(
      `http://localhost:8080/todos/${id}`,
      {
        title: todoInput.title,
        content: todoInput.content,
      },
      {
        headers: {
          Authorization: `login ${token}`,
        },
      }
    )
    .then((res) => {
      return res.status;
    });
};
