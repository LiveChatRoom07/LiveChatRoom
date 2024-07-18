import React from 'react';
import './App.css';
import Dashboard from './modules/Dashboard/Dashboard';
import Form from './modules/form/Index'
import { Route, Routes } from 'react-router-dom';

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