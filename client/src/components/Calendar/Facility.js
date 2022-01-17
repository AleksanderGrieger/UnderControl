import React from 'react';
import Card from '../generics/Card';
import Button from '../generics/Button';
import { StyledFacility } from '../styles/Facility.styled';
import { useNavigate } from 'react-router-dom';

const Facility = ({ title, img, facilityName }) => {
  const navigate = useNavigate();
  const handleClick = (facilityName) => {
    navigate(`/schedule/${facilityName}`);
  };

  return (
    <Card size='xs' m='1rem 1.5rem'>
      <StyledFacility>
        <img src={img} alt={`${img} IMG`} />
        <h1>{title}</h1>
        <Button onClick={() => handleClick(facilityName)}>Wybierz</Button>
      </StyledFacility>
    </Card>
  );
};

export default Facility;
