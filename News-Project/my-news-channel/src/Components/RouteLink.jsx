// src/Routes.js or src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Data from '../Components/Data';
import Login from '../User/Login';
import Register from '../User/Register';
import LinkPage from './LinkPage';
import Profile from '../User/Profile';

function RouteLink() {
  return (
    <Router>
      <LinkPage/>
      <Routes>
        <Route path="/" element={<Data />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/profile" element={<Profile />} ></Route>
      </Routes>
    </Router>
  );
}

export default RouteLink;
