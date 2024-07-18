import './App.css';
import Dashboard from './modules/Dashboard/Dashboard.js';
import Form from './modules/form'
import { Route, Router } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/sign_in" element={<Form isSignInPage={true}/>} />
      <Route path="/users/sign_up" element={<Form isSignInPage={false}/>} />
    </Router>
    </>
  );
}

export default App;