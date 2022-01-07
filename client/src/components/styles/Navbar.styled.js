import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  width: 100%;
  height: 10vh;
  padding: 0 2.5%;
  background-color: ${({ theme }) => theme.colors.grey.main};
  border-bottom: 5px solid ${({ theme }) => theme.colors.green.main};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 45px;
  }

  ul {
    list-style: none;

    display: flex;
    justify-content: space-around;
  }

  a {
    font-size: 33px;
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.3s;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.green.main};
  }
`;
