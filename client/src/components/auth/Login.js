import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../actions';
import { AuthContext } from '../AuthContext';
import Button from '../generics/Button';
import Card from '../generics/Card';

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      await setAuth(res);
    } catch (error) {
      error.map((err) => alert(err.msg));
    }
  };

  if (typeof auth === 'string') {
    return <Navigate to='/calendar' />;
  }

  return (
    <Card size='md'>
      <h1>Logowanie</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='email'
          placeholder='Adres Email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='Hasło'
          minLength={6}
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
