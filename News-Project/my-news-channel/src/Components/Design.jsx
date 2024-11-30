import React from 'react'
import { useState } from 'react'
import{
  BrowserRouter as Router,Routes,Route,
  Link,
  BrowserRouter
  } from 'react-router-dom'
  import Navigation from '../Components/Navigation'


  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap/dist/js/bootstrap.min.js';

function Design() {
  return (
    <>


<Router>
        
         <Navigation/>
         
         <Routes>
          <Route path="/" element={<Home/>}></Route>
 



         </Routes>
         
       
    </Router>


    </>
  )
}

export default Design