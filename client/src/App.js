import React from 'react';
import './App.css';
import ChangePassword from './modules/form/ChangePassword.js';
import Dashboard from './modules/dashboard/Dashboard.js'
import Index from './modules/form/Index.js';
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App" >
      <Index/>
    </div>
  );
}

export default App;