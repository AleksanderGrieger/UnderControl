import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar } from '../styles/Navbar.styled';

const Navbar = () => {
  //   const authLinks = (
  //     <ul>
  //       <li>
  //         <Link to='/calender'>Kalendarz</Link>
  //       </li>
  //       <li>
  //         <Link to='/info'>O nas</Link>
  //       </li>
  //       <li>
  //         <Link to='/contact'>Kontakt</Link>
  //       </li>
  //       <li>
  //         <Link to='/login'>Wyloguj</Link>
  //       </li>
  //       {/* <li>
  //         <a onClick={logout} href='#!'>
  //           <span className='hide-sm'>Wyloguj</span>
  //         </a>
  //       </li> */}
  //     </ul>
  //   );
  //   const guestLinks = (
  //     <ul>
  //       <li>
  //         <Link to='/info'>O nas</Link>
  //       </li>
  //       <li>
  //         <Link to='/contact'>Kontakt</Link>
  //       </li>
  //       <li>
  //         <Link to='/login'>Logowanie</Link>
  //       </li>
  //       <li>
  //         <Link to='/register'>Rejestracja</Link>
  //       </li>
  //     </ul>
  //   );

  return (
    <StyledNavbar>
      <Link to='/'>
        <h1>UNDER CONTROL</h1>
      </Link>
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
    </StyledNavbar>
  );
};

export default Navbar;
