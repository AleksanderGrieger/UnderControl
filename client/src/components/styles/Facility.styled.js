import styled from 'styled-components';

export const StyledFacility = styled.div`
  height: 100%;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    /* width: 100%; */
    width: calc(${({ theme }) => theme.sizes.xs} - 4rem);
  }
`;
