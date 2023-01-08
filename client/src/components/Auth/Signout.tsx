import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../../constants/todo";

const Signout = () => {
  const navigate = useNavigate();

  const SignoutHandler = () => {
    localStorage.removeItem("token");
    alert("로그아웃되었습니다.");
    navigate("/home");
  };

  return (
    <div>
      <SignoutButton type='button' onClick={SignoutHandler}>
        로그아웃
      </SignoutButton>
    </div>
  );
};

export default Signout;

const SignoutButton = styled.button`
  background-color: ${THEME_COLOR.GRAY.LIGHT};
  color: ${THEME_COLOR.GRAY.DARK};
  font-weight: bold;
  float: right;
  margin: 1rem;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${THEME_COLOR.BLUE};
    color: #fff;
    transition: all ease-in-out 0.2s;
  }
`;
