import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getAllReservationsOfFacility } from '../actions';
import { AuthContext } from '../AuthContext';
import spiner from '../../img/spiner.gif';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import Card from '../generics/Card';
import { StyledCalendar } from '../styles/Calendar.styled';

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
      <Card size='xl'>
        <StyledCalendar>
          <Scheduler data={loadData} height={660}>
            <ViewState
              defaultCurrentDate={moment().format('YYYY-MM-D')}
              defaultCurrentViewName='Week'
            />

            <DayView startDayHour={9} endDayHour={20} />
            <WeekView startDayHour={9} endDayHour={20} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip showCloseButton showOpenButton />
            <AppointmentForm />
          </Scheduler>
        </StyledCalendar>
      </Card>
    );
  } else {
    return (
      <Card size='xl'>
        <StyledCalendar>
          <Scheduler data={loadData} height={660}>
            <ViewState
              defaultCurrentDate={moment().format('YYYY-MM-D')}
              defaultCurrentViewName='Week'
            />

            <DayView startDayHour={9} endDayHour={20} />
            <WeekView startDayHour={9} endDayHour={20} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip showCloseButton showOpenButton />
            <AppointmentForm />
          </Scheduler>
        </StyledCalendar>
      </Card>
    );
  }
};

export default Calender;
