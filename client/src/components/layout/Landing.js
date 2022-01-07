import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../generics/Button';
import { StyledLanding } from '../styles/Landing.styled';

const Landing = () => {
  return (
    <StyledLanding>
      <h1>Under Control</h1>
      <p>Stwórz konto lub zaloguj się aby dokonać rezerwacji</p>
      <Button
        palette={({ theme }) => theme.colors.green.main}
        onClick={() => <Link to='/register' />}
      >
        <Link to='/register'>Stwórz konto</Link>
      </Button>
      <Button>
        <Link to='/login'>Zaloguj się</Link>
      </Button>
    </StyledLanding>
  );
};

export default Landing;
