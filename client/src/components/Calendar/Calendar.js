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
import { alpha } from '@material-ui/core/styles';
const moment = require('moment-timezone');
// import moment from 'moment';

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

  const currentDate = moment().format('YYYY-MM-D');

  const loadData = reservations?.map((reservation) => {
    // if reservation.endDate < Date.now() --> nie dodawaj do loadData
    return {
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      title: reservation.user.name,
    };
  });

  console.log(loadData.length);

  if (loadData.length) {
    return (
      <>
        {console.log(loadData)}
        <Scheduler data={loadData}>
          <ViewState currentDate={currentDate} />
          <WeekView startDayHour={9} endDayHour={18} />
          <Appointments />
        </Scheduler>
      </>
    );
  } else {
    return null;
  }
};

export default Calender;
