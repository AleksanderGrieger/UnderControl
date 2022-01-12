import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Facilities from './Facilities';

const Calender = () => {
  const { auth } = useContext(AuthContext);

  if (typeof auth !== 'string') {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Facilities />
    </>
  );
};

export default Calender;
