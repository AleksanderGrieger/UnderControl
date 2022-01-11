import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Button from '../generics/Button';
import { StyledLanding } from '../styles/Landing.styled';

const Landing = () => {
  const { auth } = useContext(AuthContext);

  if (typeof auth === 'string') {
    return <Navigate to='/info' />;
  }

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
