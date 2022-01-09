import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar } from '../styles/Navbar.styled';
import { TokenContext } from '../TokenContext';

const Navbar = () => {
  const { token, setToken } = useContext(TokenContext);

  const logout = () => {
    setToken(null);
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/calender'>Kalendarz</Link>
      </li>
      <li>
        <Link to='/info'>O nas</Link>
      </li>
      <li>
        <Link to='/contact'>Kontakt</Link>
      </li>
      <li>
        <Link to='/' onClick={logout}>
          Wyloguj
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/info'>O nas</Link>
      </li>
      <li>
        <Link to='/contact'>Kontakt</Link>
      </li>
      <li>
        <Link to='/login'>Logowanie</Link>
      </li>
      <li>
        <Link to='/register'>Rejestracja</Link>
      </li>
    </ul>
  );

  return (
    <StyledNavbar>
      <Link to='/'>
        <h1>UNDER CONTROL</h1>
      </Link>
      {token ? authLinks : guestLinks}
    </StyledNavbar>
  );
};

export default Navbar;
