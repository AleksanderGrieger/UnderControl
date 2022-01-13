import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Button from '../generics/Button';
import { StyledLanding } from '../styles/Landing.styled';

const Landing = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  if (typeof auth === 'string') {
    return <Navigate to='/calendar' />;
  }

  return (
    <StyledLanding>
      <h1>Under Control</h1>
      <p>Stwórz konto lub zaloguj się aby dokonać rezerwacji</p>
      <Button
        palette={({ theme }) => theme.colors.green.main}
        onClick={() => navigate('/register')}
      >
        Stwórz konto
      </Button>
      <Button onClick={() => navigate('/register')}>Zaloguj się</Button>
    </StyledLanding>
  );
};

export default Landing;
