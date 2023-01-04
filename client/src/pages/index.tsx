import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
      <button onClick={clickStartHandler}>시작하기</button>
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
