import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Button from './generics/Button';
import Card from './generics/Card';
import moment from 'moment';
import { loadUser, reserve } from './actions';

const Reservation = () => {
  const { auth } = useContext(AuthContext);
  const { facilityName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: '',
    facility: '',
    startDate: '',
    endDate: '',
  });

  const { userEmail, facility, startDate, endDate } = formData;

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await loadUser(auth);
      setFormData({
        ...formData,
        userEmail: auth ? currentUser.email : '',
        facility: facilityName,
      });
    };
    fetchUser();
  }, [facilityName, auth]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await reserve(
        { userEmail, facilityName: facility, startDate, endDate },
        auth
      );
      alert('Rrezerwacja przeszła pomyślnie!');
      navigate(`/schedule/${facilityName}`);
    } catch (error) {
      error.map((err) => alert(err.msg));
    }
  };

  return (
    <Card size='md'>
      <h1>Rezerwacja</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <p>Obiekt</p>
        <input
          type='text'
          placeholder='Obiekt'
          name='facility'
          value={facility}
          readOnly
        />
        <input
          type='email'
          placeholder='Adres Email'
          name='userEmail'
          value={userEmail}
          readOnly
        />
        <input
          type='datetime-local'
          placeholder='Początek'
          min={moment().format('YYYY-MM-DTHH:mm')}
          //   dorobić walidacje ze mozna rezerwowac 9-20
          name='startDate'
          value={startDate}
          onChange={(e) => onChange(e)}
        />
        <input
          type='datetime-local'
          placeholder='Koniec'
          min={moment().format('YYYY-MM-DTHH:mm')}
          name='endDate'
          value={endDate}
          onChange={(e) => onChange(e)}
        />
        <Button type='submit'>Zapisz</Button>
      </form>
    </Card>
  );
};

export default Reservation;
