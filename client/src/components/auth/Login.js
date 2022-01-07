import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../generics/Button';
import Card from '../generics/Card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
    console.log(formData);
  };
  return (
    <Card size='md'>
      <h1>Logowanie</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <Button type='submit'>Zaloguj się</Button>
      </form>
      <p>
        Nie masz jeszcze konta? <Link to='/register'>Stwórz nowe konto</Link>
      </p>
    </Card>
  );
};

export default Login;
