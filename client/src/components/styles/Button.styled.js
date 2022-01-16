import styled from 'styled-components';

export const StyledButton = styled.button`
  color: ${({ theme }) => theme.colors.main};
  background-color: ${({ theme, palette }) =>
    palette ? palette : theme.colors.grey.main};
  border: none;
  margin: 20px;
  padding: 15px 30px;
  font-size: 33px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  a {
    text-decoration: none;
  }
`;
