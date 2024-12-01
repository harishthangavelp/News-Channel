import React from "react";
import { NavLink } from "react-router-dom";
import '../Components/Home.css';
import pic1 from '../images/html.png';
import pic2 from '../images/css.png';
import pic3 from '../images/js.png';

function Home() {
  return (
    <>
      <div className="topnav1">
        <hr />
        <hr />
        <hr />
        <div className="image-container">
          {/* Image 1 with heading HTML */}
          <div className="image-item" >
            <img src={pic1} width="50px" alt="HTML" />
            <h3 className="image-heading">HTML</h3>
          </div>

          <hr />

          {/* Image 2 with heading CSS */}
          <div className="image-item">
            <img src={pic2} width="50px" alt="CSS" />
            <h3 className="image-heading">CSS</h3>
          </div>

          <hr />

          {/* Image 3 with heading JS */}
          <div className="image-item">
            <img src={pic3} width="50px" alt="JS" />
            <h3 className="image-heading">JS</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
