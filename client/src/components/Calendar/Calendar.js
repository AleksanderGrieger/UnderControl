import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getAllReservationsOfFacility } from '../actions';
import { AuthContext } from '../AuthContext';

const Calender = () => {
  const { auth } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const { facilityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const reservationsFromApi = await getAllReservationsOfFacility(
        facilityName
      );
      setReservations(reservationsFromApi);
    };
    fetchData();
  }, [setReservations]);

  if (typeof auth != 'string') {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div>
        {reservations?.map((reservation, index) => {
          return (
            <>
              <h1>{reservation.user.name}</h1>
              <h1>{reservation.startDate}</h1>
              <h1>{reservation.endDate}</h1>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Calender;
