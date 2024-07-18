import React from 'react';
import './App.css';
import Dashboard from './modules/Dashboard/Dashboard.js';
import Form from './modules/form/Index'
import { Route, Routes, Navigate } from 'react-router-dom';


// Routing Protection

const ProtectedRoute = ({children}) => {
  const isLoggedIn = localStorage.getItem('user:token') != null || true

  if(!isLoggedIn) {
    return <Navigate to={'/user/sign_in'}/>
  }
  else if(isLoggedIn && ['/user/sign_in', '/user/sign_up'].includes(window.location.pathname)){
    return <Navigate to={'/'} />
  }
  return children;
}




function App() {

  return (
    <div className="App" >
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/user/sign_in' element={
          <ProtectedRoute>
            <Form isSignInPage={true} />
          </ProtectedRoute>
        } />

        <Route path='/user/sign_up' element={
          <ProtectedRoute>
            <Form isSignInPage={false} />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;