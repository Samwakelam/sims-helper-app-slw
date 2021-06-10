// Packages
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Styles
import './App.css';
// components
import Navbar from '../components/navigation/Navbar';
import Header from '../components/content/Header';
// Pages 
import DegreesPage from '../pages/DegreesPage';
import CareersPage from '../pages/CareersPage';
import HomePage from '../pages/HomePage';


function App() {
  return (
    <div id="App">
      <Router >
      <Header />
      <Navbar />
      <main>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/careers' component={CareersPage} />
        <Route exact path='/degrees' component={DegreesPage} />
      </main>
      </Router>
    </div>
  );
}

export default App;
