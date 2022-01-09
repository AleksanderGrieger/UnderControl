import React, { useMemo, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import GlobalStyles from './components/styles/Global';
import { ThemeProvider } from 'styled-components';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TokenContext } from './components/TokenContext';
import About from './components/About';
import Contact from './components/Contact';

const theme = {
  colors: {
    main: '#fff',
    green: {
      main: '#0CCE6B',
      dark: '#07522b',
    },
    grey: {
      main: '#5D5D5D',
      light: '#a5a5a5',
      dark: '#000',
    },
  },
  sizes: {
    xl: '100%',
    lg: '80%',
    md: '50%',
    sm: '30%',
    xs: '15%',
  },
};

const App = () => {
  const [token, setToken] = useState(null);
  const value = useMemo(() => ({ token, setToken }), [token, setToken]);
  // console.log('xd', value, 'xd');
  return (
    <TokenContext.Provider value={value}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Navbar />
          <section className='container'>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/info' element={<About />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </section>
        </ThemeProvider>
      </BrowserRouter>
    </TokenContext.Provider>
  );
};

export default App;
