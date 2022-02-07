import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAllReservationsOfFacility } from '../actions';
import { AuthContext } from '../AuthContext';
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
import Button from '../generics/Button';

const Calender = () => {
  const { auth } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const { facilityName } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reservation/${facilityName}`);
  };

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Card size='xl'>
        <h1 style={{ fontSize: '32px' }}>
          {capitalizeFirstLetter(facilityName)}
        </h1>
        <StyledCalendar>
          <Scheduler data={loadData} height={660}>
            {/* <Scheduler data={reservations} height={660}> */}
            <ViewState
              defaultCurrentDate={moment().format('YYYY-MM-D')}
              defaultCurrentViewName='Week'
            />

            <DayView startDayHour={9} endDayHour={22} />
            <WeekView startDayHour={9} endDayHour={22} />
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
      <Button onClick={handleClick}>Rezerwuj</Button>
    </>
  );
};

export default Calender;
