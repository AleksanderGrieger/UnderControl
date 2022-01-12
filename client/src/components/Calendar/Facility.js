import React from 'react';
import Card from '../generics/Card';
import Button from '../generics/Button';
import { StyledFacility } from '../styles/Facility.styled';

const Facility = ({title, img}) => {
  return (
    <Card size='xs' m='1rem 1.5rem'>
      <StyledFacility>
        <img src={img} />
        <h1>{title}</h1>
        <Button>Wybierz</Button>
      </StyledFacility>
    </Card>
  );
};

export default Facility;
