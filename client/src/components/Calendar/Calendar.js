import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getAllReservationsOfFacility } from '../actions';
import { AuthContext } from '../AuthContext';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

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
  }, [facilityName, setReservations]);

  if (typeof auth != 'string') {
    return <Navigate to='/' />;
  }

  const loadData = reservations
    ?.filter((item) => {
      return (
        moment(item.endDate).format('YYYY-MM-DTHH:mm') >
        moment().subtract(3, 'day').format('YYYY-MM-DTHH:mm')
      );
    })
    .map((reservation) => {
      return {
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        title: reservation.user.name,
      };
    });

  if (loadData.length) {
    return (
      <>
        <Scheduler data={loadData}>
          <ViewState currentDate={moment().format('YYYY-MM-D')} />
          <WeekView startDayHour={9} endDayHour={18} />
          <Appointments />
        </Scheduler>
      </>
    );
  } else {
    return (
      <>
        <Scheduler data={loadData}>
          <ViewState currentDate={moment().format('YYYY-MM-D')} />
          <WeekView startDayHour={9} endDayHour={18} />
          <Appointments />
        </Scheduler>
      </>
    );
  }
};

export default Calender;
