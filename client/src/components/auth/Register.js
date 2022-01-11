import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../actions';
import { AuthContext } from '../AuthContext';
import Button from '../generics/Button';
import Card from '../generics/Card';

const Register = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Password do not match');
    } else {
      const res = await register({ name, email, password });
      await setAuth(res);
    }
  };

  if (typeof auth === 'string') {
    return <Navigate to='/info' />;
  }

  return (
    <Card size='md'>
      <h1>Rejestracja</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='Imię'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type='email'
          placeholder='Aders Email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='Hasło'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='Potwierdź Hasło'
          name='password2'
          value={password2}
          onChange={(e) => onChange(e)}
        />
        <Button type='submit'>Stwórz nowe konto</Button>
      </form>
      <p>
        Masz już konto? <Link to='/login'>Zaloguj się</Link>
      </p>
    </Card>
  );
};

export default Register;
