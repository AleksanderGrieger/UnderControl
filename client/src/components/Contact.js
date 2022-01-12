import React from 'react';
import Card from './generics/Card';

const Contact = () => {
  return (
    <Card size='md'>
      <h1>Kontakt</h1>
      <p>Adres Email</p>
      <div className='card'>
        <p>under.control@gmail.com</p>
      </div>
      <p>Numer Telefonu</p>
      <div className='card'>
        <p>+48 111 222 333</p>
      </div>
    </Card>
  );
};

export default Contact;
