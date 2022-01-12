import React from 'react';
import { SyledFacilities } from '../styles/Facilities.styled';
import Facility from './Facility';
import imgOrlik from '../../img/orlik.jpg';
import imgSilownia from '../../img/silownia.jpg';
import imgHala from '../../img/hala.jpg';
import imgBojo from '../../img/bojo.jpg';
import imgSalaKonf from '../../img/salaKonf.jpg';
import imgBasen from '../../img/basen.jpg';

const Facilities = () => {
  return (
    <SyledFacilities>
      <Facility title='Orlik' img={imgOrlik} />
      <Facility title='Siłownia' img={imgSilownia} />
      <Facility title='Hala' img={imgHala} />
      <Facility title='Bojo' img={imgBojo} />
      <Facility title='Sala' img={imgSalaKonf} />
      <Facility title='Basen' img={imgBasen} />
    </SyledFacilities>
  );
};

export default Facilities;
