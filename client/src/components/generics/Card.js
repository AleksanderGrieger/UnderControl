import React from 'react';
import { StyledCard } from '../styles/Card.styled';

function Card({ children, size, m }) {
  return (
    <StyledCard size={size} m={m}>
      <div className='card'>{children}</div>
    </StyledCard>
  );
}

export default Card;
