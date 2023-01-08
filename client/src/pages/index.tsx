import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../constants/todo";
import Logo from "./../assets/wanted-logo.png";

const Home = () => {
  const navigate = useNavigate();
  const clickStartHandler = () => {
    navigate("/auth");
  };

  return (
    <Container>
      <h1>
        <img src={Logo} alt='원티드' />
      </h1>
      <StartButton onClick={clickStartHandler}>시작하기</StartButton>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  background-color: ${THEME_COLOR.BLUE};
  color: #fff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;
