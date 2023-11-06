import React from 'react';
import './App.css';
import QuizComponent from './components/QuizComponent';
import HomePage from './pages/HomePage';
import Nav from './pages/Nav';
import Login from './pages/Login';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <HomePage />
      <Outlet />
      <QuizComponent />
    </div>
  );
}

export default App;
