import { createContext, useState, useEffect } from 'react';

const LoggedInContext = createContext();

const LoggedInProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({}); // Initialize as an empty object
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      setLoggedInUser({ username: username, token: token });
    }
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedInUser, setLoggedInUser, profile, setProfile }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
