import React from 'react';
import Card from './generics/Card';

const About = () => {
  return (
    <Card size='lg'>
      <h1>Informacje</h1>
      <p>
        Aplikacja została stworzona aby ułatwić zarządzanie ośrodkiem, pod kątem
        organizacji zajęć na obiektach sportowych, należących do ośrodka. Aby
        mieć wgląd w kalendarz lub stworzyć rezerwacje, należy
        zarejestrować/zalogować się.
      </p>
    </Card>
  );
};

export default About;
