import React from 'react';
import { StyledCard } from '../styles/Card.styled';

function Card({ children, size }) {
  return (
    <StyledCard size={size}>
      <div>{children}</div>
    </StyledCard>
  );
}

export default Card;
