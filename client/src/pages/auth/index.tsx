import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createUser, getUser } from "../../utils/auth";
import Logo from "./../../assets/wanted-logo.png";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isSignUpClicked) {
        const res = await createUser(email, password);
        const { isSuccess, data } = res;
        if (isSuccess) {
          localStorage.setItem("token", data.token);
          alert(data.message);
          navigate("/todo");
        } else {
          return;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.details);
      }
      return;
    }

    try {
      const res = await getUser(email, password);
      const { isSuccess, data } = res;
      if (isSuccess) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/todo");
      } else {
        alert(`로그인 실패. ${data.message}`);
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.details);
      }
      return;
    }
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    emailRegex.test(e.target.value);
  };
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signUpSignInClickHandler = () => {
    setIsSignUpClicked((prev) => !prev);
  };

  const REGISTERED = "이미 회원이신가요?";
  const NOT_REGISTERED = "아직 회원이 아니신가요?";

  return (
    <div>
      <h1>
        <img src={Logo} alt='원티드' />
      </h1>
      <Form onSubmit={submitHandler}>
        <label htmlFor=''>이메일</label>
        <input
          type='text'
          value={email}
          onChange={emailChangeHandler}
          onBlur={validateEmail}
        />
        <label htmlFor=''>비밀번호</label>

        <input
          type='password'
          value={password}
          onChange={passwordChangeHandler}
        />
        <button>{isSignUpClicked ? "회원가입" : "로그인"}</button>
      </Form>
      <p>
        {isSignUpClicked ? REGISTERED : NOT_REGISTERED}
        <button type='button' onClick={signUpSignInClickHandler}>
          {isSignUpClicked ? "로그인" : "회원가입"}
        </button>
      </p>
    </div>
  );
};

export default Auth;

const Form = styled.form`
  border: solid 1px red;
`;
