import React from 'react';
import './App.css';
<<<<<<< HEAD
import Dashboard from './modules/Dashboard/Dashboard';
import Form from './modules/form/Index'
import { Route, Routes } from 'react-router-dom';
=======
import ChangePassword from './modules/form/ChangePassword.js';
import Dashboard from './modules/dashboard/Dashboard.js'
import Index from './modules/form/Index.js';
import { Routes } from 'react-router-dom';

>>>>>>> 4d16a79db05c9bfa373bbb47b00059317bb88cc7

function App() {

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='user/sign_in' element={<Form isSignInPage={true} />} />
        <Route path='user/sign_up' element={<Form isSignInPage={false} />} />
      </Routes>
    </div>
  );
}

export default App;