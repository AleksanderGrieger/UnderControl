import { createContext } from 'react';

export const TokenContext = createContext(null);
// // Create a context
// const TokenContext = createContext({});

// const TokenProvider = ({ children }) => {
//   const [auth, setAuthState] = useState(initialState);

//   // Get current auth state from localStorage
//   const getAuthState = async () => {
//     try {
//       const authDataString = await localStorage.getItem('auth');
//       const authData = JSON.parse(authDataString || {});
//       // Configure axios headers
//       configureAxiosHeaders(authData.token, authData.phone);
//       setAuthState(authData);
//     } catch (err) {
//       setAuthState({});
//     }
//   };

//   // Update localStorage & context state
//   const setAuth = async (auth) => {
//     try {
//       await localStorage.setItem('auth', JSON.stringify(auth));
//       // Configure axios headers
//       configureAxiosHeaders(auth.token, auth.phone);
//       setAuthState(auth);
//     } catch (error) {
//     //   Promise.reject(error);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   return (
//     <TokenContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </TokenContext.Provider>
//   );
// };

// export { TokenContext, TokenProvider };
