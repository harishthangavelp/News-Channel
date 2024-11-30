// src/Routes.js or src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from '../Components/Data';
// import Login from '../Components/Login';
// import Register from '../Components/Register';
import LinkPage from './LinkPage';

function RouteLink() {
  return (
    <Router>
      <LinkPage/>
      <Routes>
        <Route path="/" element={<Data />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default RouteLink;
