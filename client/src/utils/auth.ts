import axios from "axios";

export const createUser = (emailInput: string, passwordInput: string) => {
  return axios
    .post("http://localhost:8080/users/create", {
      email: emailInput,
      password: passwordInput,
    })
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: true, data: res.data };
      } else {
        return { isSuccess: false, data: res.data };
      }
    });
};

export const getUser = (emailInput: string, passwordInput: string) => {
  return axios
    .post("http://localhost:8080/users/login", {
      email: emailInput,
      password: passwordInput,
    })
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: true, data: res.data };
      } else {
        return { isSuccess: false, data: res.data };
      }
    });
};
