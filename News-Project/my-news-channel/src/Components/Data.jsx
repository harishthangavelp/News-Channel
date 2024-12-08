import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newsData from '../Components/newsDetails.json';
import '../Components/Data.css';
import nup from '../images/nuppp.png'; // Assuming this is your profile image
import { Modal } from 'react-bootstrap';
import Home from './Home';
import { FaHeart } from 'react-icons/fa'; 

function Data() {
  const [category, setCategory] = useState(newsData.map(item => ({ ...item, liked: false, likes: 0 }))); // Add 'liked' and 'likes' state to each item
  const navigate = useNavigate();
  const [popupContent, setPopupContent] = useState(null); // State for popup content
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [myname, setMyname] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown menu visibility
  const handleCloseModal = () => setShowModal(false);

  const toggleLike = (id) => {
    setCategory((prevCategory) =>
      prevCategory.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  useEffect(() => {
    const storedMyname = localStorage.getItem("myname");
    if (storedMyname) {
      setMyname(storedMyname); 
    }
  }, []);

  const handleFilterChange = (e) => {
    const word = e.target.value;
    if (word === "all") {
      setCategory(newsData);
    } else {
      const filtered = newsData.filter((item) => item.kind === word);
      setCategory(filtered);
    }
  };

  const openPopup = (detail, description) => {
    setPopupContent({ description, detail });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to Profile page
  };

  const handleLogin = () => {
    localStorage.removeItem("myname"); // Clear the stored username
    navigate('/login'); // Redirect to login page
  };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('#808080');
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleLogout = () => {
    if(myname === myname){
    localStorage.removeItem("myname"); // Clear the stored username from localStorage
    setMyname(''); // Clear the username in the state, effectively logging out
    handleRefresh();  
  }
    if(myname === ""){
      // alert('You need to login first');
      setModalMessage("You need to login first");
      setModalColor('#808080'); // Success
      setShowModal(true);
      setTimeout(() => {
        handleRefresh();
    }, 1500);
    }
  };

  return (
    <div style={{ backgroundColor: '#2e2e2e', padding: '20px', minHeight: '100vh', position: 'relative' }}>
      {/* User Name Display */}
      <div
        style={{
          position: 'absolute',
          top: '1.55em',
          right: '4.5em',
          color: '#d4af37',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
        }}
      >
        {myname} {/* Display the name here */}
      </div>

      {/* Profile Image */}
      <img
        src={nup}
        alt="Profile"
        onClick={toggleDropdown} // Toggle the dropdown when profile image is clicked
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          border: '2px solid #d4af37',
          cursor: 'pointer',
        }}
      />

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            right: '20px',
            backgroundColor: '#444',
            borderRadius: '8px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            zIndex: 1,
          }}
        >
          <ul
            style={{
              listStyleType: 'none',
              padding: '10px 0',
              margin: '0',
              color: '#fff',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <li>
              <button
                onClick={handleProfileClick}
                style={{
                  background: 'none',
                  color: '#d4af37',
                  padding: '8px 20px',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',  // Add transition for smooth hover effect
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#575757'} // On hover
                onMouseLeave={(e) => e.target.style.backgroundColor = '#444'}  // On hover out
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={handleLogin}
                style={{
                  background: 'none',
                  color: '#d4af37',
                  padding: '8px 20px',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',  // Add transition for smooth hover effect
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#575757'} // On hover
                onMouseLeave={(e) => e.target.style.backgroundColor = '#444'}  // On hover out
              >
                Login
              </button>
            </li>
            <li>
              <button
                className='nuphov'
                onClick={handleLogout}
                style={{
                  background: 'none',
                  color: '#d4af37',
                  padding: '8px 20px',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',  // Add transition for smooth hover effect
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#575757'} // On hover
                onMouseLeave={(e) => e.target.style.backgroundColor = '#444'}  // On hover out
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* News Section */}
      <section>
        <div>
          <h2 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px' }}>
            Today News
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label
              htmlFor="category-select"
              style={{
                color: '#d4af37',
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
              }}
            >
              Filter by Category:
            </label>
            <select
              id="category-select"
              onChange={handleFilterChange}
              style={{
                marginLeft: '10px',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #d4af37',
                backgroundColor: '#444',
                color: '#d4af37',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="general">General</option>
              <option value="breaking">Breaking</option>
              <option value="cinema">Cinema</option>
              <option value="entertainment">Entertainment</option>
              <option value="weather">Weather</option>
            </select>
          </div>
        </div>
      </section>

      {/* News Cards */}
      <div className="card-container">
        {category.map((post) => (
          <div className="homecard" key={post.id} style={{ position: 'relative' }}>
            <img
              src={post.img}
              style={{ objectFit: 'cover', width: '100%' }}
              width="384px"
              height="240px"
              alt={post.title}
            />
            <p className="desccss" onClick={() => openPopup( post.detail,post.description)}>
              {post.description}
            </p>
            {/* Heart Icon and Like Count */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <button
    className="lbt"
    onClick={() => toggleLike(post.id)}
    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
  >
    <div
      style={{
        width: '25px',
        height: '25px',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={post.liked ? 'red' : 'transparent'}
        stroke={post.liked ? 'none' : 'white'}
        strokeWidth="1"
        width="100%"
        height="100%"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  </button>
  <span
    style={{
      color: '#d4af37',
      position: 'absolute',
      top: '3em',
      right: '0.5em',
      fontFamily: 'sans-serif',
    }}
  >
    {post.likes} {post.likes === 1 ? 'like' : 'likes'}
  </span>
</div>

          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered className="pink-modal">
        <Modal.Header>
            <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: modalColor, color: '#fce4ec' }}>
            <h4>{modalMessage}</h4>
        </Modal.Body>
      </Modal>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{popupContent.description}</h3>
            <p>{popupContent.detail}</p>
            <button onClick={closePopup} className="popup-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;
