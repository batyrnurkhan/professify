import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainRoutes from './components/MainRoutes';
import { LoggedInProvider } from './components/LoggedInContext';

function App() {
  return (
    <LoggedInProvider>
      <Router>
        <Navbar />
        <MainRoutes />
      </Router>
    </LoggedInProvider>
  );
}

export default App;
