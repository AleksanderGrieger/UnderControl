import React, { useContext, useEffect, useState } from 'react';
import { SyledFacilities } from '../styles/Facilities.styled';
import Facility from './Facility';
import { getAllFacilities } from '../actions';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const Facilities = () => {
  const { auth } = useContext(AuthContext);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const facilitiesFromApi = await getAllFacilities();
      setFacilities(facilitiesFromApi);
    };
    fetchData();
  }, [setFacilities]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (typeof auth != 'string') {
    return <Navigate to='/' />;
  }

  return (
    <SyledFacilities>
      <div className='horizontalScroll'>
        {facilities?.map((facility, index) => {
          return (
            <Facility
              key={index}
              title={capitalizeFirstLetter(facility.name)}
              img={require(`../../img/${facility.name}.jpg`).default}
              facilityName={facility.name}
            />
          );
        })}
      </div>
      <div className='info'>
        <h1>
          Wybierz jeden z obiektów aby sprawdzić jego dostępność oraz dokanać
          rezerwacji.
        </h1>
      </div>
    </SyledFacilities>
  );
};

export default Facilities;
