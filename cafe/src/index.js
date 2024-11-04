import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StaffApp from './StaffApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/staff" element={<StaffApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
