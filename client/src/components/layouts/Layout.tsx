import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  border: solid 1px red;
  max-width: 820px;
  height: 100vh;
  margin: 0 auto;
`;
