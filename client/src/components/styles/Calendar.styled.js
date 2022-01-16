import styled from 'styled-components';

export const StyledCalendar = styled.div`
  /* background-color: #333; */
  /* color: #000; */
  h1 {
    font-size: 16px;
  }
  p {
    font-size: 16px;
  }
  input {
    background-color: rgba(255, 255, 255, 0.4);
    width: 90%;
    height: 35px;
    /* margin: 1vh 20px; */
    padding: 10px;
    font-size: 13px;
    outline-color: ${({ theme }) => theme.colors.green.main};
    border: solid 2.5px ${({ theme }) => theme.colors.grey.light};
  }
`;
