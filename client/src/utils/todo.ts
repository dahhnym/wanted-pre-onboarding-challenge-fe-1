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

export const getTodos = (token: string) => {
  return axios
    .get("http://localhost:8080/todos", {
      headers: {
        Authorization: `login ${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    });
};
