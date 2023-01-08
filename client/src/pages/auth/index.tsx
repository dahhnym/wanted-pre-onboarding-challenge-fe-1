import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createUser, getUser } from "../../utils/auth";
import Logo from "./../../assets/wanted-logo.png";
import axios from "axios";
import { THEME_COLOR } from "../../constants/todo";

type ConfirmBtnProps = {
  isValid: boolean;
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validiation, setValidation] = useState({
    emailIsValid: false,
    passwordIsValid: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isSignUpClicked) {
        const res = await createUser(email, password);
        const { isSuccess, data } = res;
        if (isSuccess) {
          localStorage.setItem("token", data.token);
          alert(data.message);
          navigate("/");
        } else {
          return;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.details);
      }
      return;
    }

    try {
      const res = await getUser(email, password);
      const { isSuccess, data } = res;
      if (isSuccess) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/");
      } else {
        alert(`로그인 실패. ${data.message}`);
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.details);
      }
      return;
    }
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValid = emailRegex.test(e.target.value);
    setValidation((prev) => {
      return { ...prev, emailIsValid: isValid };
    });
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#&^])[A-Za-z\d@$!%*#&^]{8,}$/g;
    const isValid = passwordRegex.test(e.target.value);
    setValidation((prev) => {
      return { ...prev, passwordIsValid: isValid };
    });
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const authClickHandler = () => {
    setIsSignUpClicked((prev) => !prev);
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  const REGISTERED = "이미 회원이신가요?";
  const NOT_REGISTERED = "아직 회원이 아니신가요?";

  return (
    <Container>
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
          onBlur={validatePassword}
        />
        {errorMsg && <Error>{errorMsg}</Error>}
        <ConfirmBtn
          isValid={validiation.emailIsValid && validiation.passwordIsValid}>
          {isSignUpClicked ? "회원가입" : "로그인"}
        </ConfirmBtn>
      </Form>
      <AuthGuide>
        <span>{isSignUpClicked ? REGISTERED : NOT_REGISTERED}</span>
        <button type='button' onClick={authClickHandler}>
          {isSignUpClicked ? "로그인" : "회원가입"}
        </button>
      </AuthGuide>
    </Container>
  );
};

export default Auth;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    height: 2.5rem;
    padding: 1rem 0.8rem;
    border: solid 1px blue;
    border-radius: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Error = styled.p`
  color: ${THEME_COLOR.RED};
`;

const ConfirmBtn = styled.button<ConfirmBtnProps>`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.isValid ? THEME_COLOR.BLUE : THEME_COLOR.GRAY.LIGHT};
  color: ${(props) => (props.isValid ? "#fff" : THEME_COLOR.GRAY.DARK)};
  height: 45px;
  border-radius: 20px;
  &:hover {
    cursor: ${(props) => (props.isValid ? "pointer" : "default")};
  }
`;

const AuthGuide = styled.p`
  font-size: 0.9rem;
  button {
    margin-left: 0.5rem;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;
