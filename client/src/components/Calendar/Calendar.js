import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Calender = (facilityName) => {
  const { auth } = useContext(AuthContext);

  // if (typeof auth != 'string') {
  //   return <Navigate to='/' />;
  // }

  return (
    <>
      <div>{facilityName}</div>
    </>
  );
};

export default Calender;
