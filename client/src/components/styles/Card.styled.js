import styled from 'styled-components';

export const StyledCard = styled.div`
  width: ${({ theme, size }) => {
    if (theme.sizes.hasOwnProperty(size)) {
      if (size === 'xl') return theme.sizes.xl;
      if (size === 'lg') return theme.sizes.lg;
      if (size === 'md') return theme.sizes.md;
      if (size === 'sm') return theme.sizes.sm;
      if (size === 'xs') return theme.sizes.xs;
    } else {
      return theme.sizes.lg;
    }
  }};

  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);

  div {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 1rem;
  }

  h1 {
    font-size: 62px;
    margin: 1vh 20px;
  }

  input {
    background-color: rgba(255, 255, 255, 0.4);
    width: 90%;
    height: 75px;
    margin: 1vh 20px;
    padding: 20px;
    font-size: 33px;
    outline-color: ${({ theme }) => theme.colors.green.main};
    border: solid 2.5px ${({ theme }) => theme.colors.grey.light};
  }

  p {
    font-size: 30px;
    margin: 1vh 20px;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.grey.main};
      transition: all 0.3s;

      &:hover {
        letter-spacing: 0.5px;
        color: ${({ theme }) => theme.colors.green.dark};
      }
    }
  }
`;
