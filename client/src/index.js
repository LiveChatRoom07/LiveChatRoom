import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import {BrowserRouter} from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 4d16a79db05c9bfa373bbb47b00059317bb88cc7

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
    <App />
    </BrowserRouter>
=======

    <BrowserRouter>
    <App />
    </BrowserRouter>
    
>>>>>>> 4d16a79db05c9bfa373bbb47b00059317bb88cc7
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
