import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/signupPage'
import HomePage from './pages/homePage';
import WelcomePage from './pages/welcome';
import CardManager from './pages/cardManager'
import './App.css';

function App() {
  const [cards, setCards] = React.useState('')

  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/cards' element={<CardManager/>}/>
      </Routes>
  </Router>
  );
}

export default App;
