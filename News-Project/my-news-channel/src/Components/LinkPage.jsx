import { Link } from 'react-router-dom' 
import React from 'react'

function LinkPage() {
  return (
    <>
    <nav>
    <Link to = "/login" ></Link>
    <Link to = "/register" ></Link>
    <Link to = "/profile" ></Link>
    <Link to = "/favorites" ></Link>
   
    </nav>
    </>
  )
}

export default LinkPage