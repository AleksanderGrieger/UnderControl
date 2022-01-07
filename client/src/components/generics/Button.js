import React from 'react';
import { StyledButton } from '../styles/Button.styled';

const Button = ({ children, type, palette, onClick }) => {
  return (
    <StyledButton
      palette={palette}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
