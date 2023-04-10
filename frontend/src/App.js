import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainRoutes from './components/MainRoutes';
import { LoggedInContext } from './components/LoggedInContext';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Navbar />
          <MainRoutes />
        </LoggedInContext.Provider>
      </Router>
    </div>
  );
}

export default App;
