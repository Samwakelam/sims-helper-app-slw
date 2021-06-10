// packages
import { useState, createContext } from 'react';

// functions

// create context 
const LoggedInContext = createContext();


const LoggedInContextProvider = ({children}) => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  
  const userLoggedIn = async () => {
    setLoggedIn(true);
  }

  const userLoggedOut = async () => {
    setLoggedIn(false);
  }

  // console.log('LoggedInContext loggedIn =', loggedIn);
  return (
    <LoggedInContext.Provider value={{ loggedIn, userLoggedIn, userLoggedOut }}>
      {children}
    </LoggedInContext.Provider>
  )
}

export default LoggedInContext;
export { LoggedInContextProvider };