import styled from 'styled-components';

export const StyledAlert = styled.div`
  position: absolute;
  bottom: 5vh;
  left: 5vh;
  background-color: ${({ theme, error }) =>
    error ? theme.colors.danger.main : theme.colors.green.main};
  color: ${({ theme }) => theme.colors.main};
  padding: 15px 30px;
  font-size: 33px;
  min-width: 300px;
  max-width: 750px;
  animation: alertAnimation 3s both linear;

  @keyframes alertAnimation {
    0% {
      left: -750px;
    }
    20% {
      left: 5vh;
      bottom: 5vh;
    }
    90% {
      left: 5vh;
      bottom: 5vh;
      opacity: 1;
    }
    100% {
      bottom: 15vh;
      opacity: 0;
    }
  }
`;
