import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import newsData from '../Components/newsDetails.json';
import '../Components/Data.css';
import nup from '../images/nuppp.png'; // Assuming this is your profile image
import star from '../images/sstar.png'
import { Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import edit from '../images/edit.png'
import del from '../images/delete.png'
import AddDataModal from '../Upload-Data/AddDataModal';

function Data() {
 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [popupContent, setPopupContent] = useState(null); // State for popup content
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [myname, setMyname] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);  // Ref for dropdown
  const profileRef = useRef(null);   // Ref for profile image
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const handleCloseModal = () => setShowModal(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalClose = () => {
    setIsModalVisible(false); // Close modal by setting state to false
  };

  // Function to handle form submit (post-submission tasks)
  const handleFormSubmit = () => {
   
    // Handle any other tasks after successful data submission
  };

//editing ..........................
const [editingPost, setEditingPost] = useState(null);
const [editFormData, setEditFormData] = useState({
  description: '',
  kind: '',
  img: '',
  detail: ''
});

const openEditForm = (post) => {
  console.log(post);  // Check if the post is correct
  setEditingPost(post); // Store the post being edited
  setEditFormData({
    description: post.description,
    kind: post.kind,
    img: post.img,
    detail: post.detail,
  });
};


const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  
  const updatedNewsData = category.map((item) =>
    item.id === editingPost.id ? { ...item, ...editFormData } : item
  );
  setCategory(updatedNewsData);
  localStorage.setItem("newsCategory", JSON.stringify(updatedNewsData));
  setEditingPost(null); // Close the modal

  // Save changes to the backend
  try {
    const response = await fetch('https://news-channel-14.onrender.com/update-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNewsData),
    });

    if (response.ok) {
      console.log('News data updated successfully');
    } else {
      console.error('Failed to update news data');
    }
  } catch (error) {
    console.error('Error updating news data:', error);
  }
};



const handleDelete = async (id) => {
  const updatedCategory = category.filter((item) => item.id !== id);
  setCategory(updatedCategory);

  // Save the updated data to localStorage
  localStorage.setItem("newsCategory", JSON.stringify(updatedCategory));
  try {
    const response = await fetch('https://news-channel-14.onrender.com/delete-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setCategory((prevCategory) => prevCategory.filter((item) => item.id !== id)); // Update the UI
      console.log('News item deleted successfully');
    } else {
      console.error('Failed to delete news item');
    }
  } catch (error) {
    console.error('Error deleting news item:', error);
  }
};











  const toggleLike = (id) => {
    setCategory((prevCategory) =>
      prevCategory.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
 
    
    // Update localStorage with `likes`
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || {};
    const updatedLikes = { ...storedLikes };
 
    if (updatedLikes[id]) {
      delete updatedLikes[id]; // If already liked, remove from storage
    } else {
      updatedLikes[id] = (storedLikes[id] || 0) + 1; // Save likes count
    }
 
    localStorage.setItem("likedItems", JSON.stringify(updatedLikes));
  };
 

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure the event target is not within the dropdown or the profile image
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setDropdownVisible(false); // Close the dropdown if click is outside
      }
    };

     // Add event listener for clicks
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup the event listener when the component unmounts
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
 
useEffect(() => {
  const storedMyname = localStorage.getItem('myname');
  const storedUsername = localStorage.getItem('username');
  const storedLoginTime = localStorage.getItem('loginTime');

  if (storedMyname && storedUsername && storedLoginTime) {
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Validate login time
    if (currentTime - storedLoginTime <= oneHour) {
      setMyname(storedMyname);
      setUsername(storedUsername);
    } else {
      // Clear expired login data
      localStorage.removeItem('myname');
      localStorage.removeItem('username');
      localStorage.removeItem('loginTime');
    }
  }

   
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || {};
  const updatedCategory = newsData.map((item) => ({
    ...item,
    liked: !!storedLikes[item.id], // Check if the item is liked
    likes: storedLikes[item.id] || 0, // Retrieve the stored likes count or default to 0
  }));
  setCategory(updatedCategory);
}, []);



const [newsState, setNewsState] = useState(
  newsData.map((item) => ({
    ...item,
    liked: false,
    likes: 0,
  }))
); // Store the complete news data with likes and liked status

const [category, setCategory] = useState(newsState); // Derive the filtered view from `newsState`



const handleFilterChange = (e) => {
  const word = e.target.value;
  if (word === "all") {
    setCategory(newsState); // Reset to full state
  } else {
    setCategory(newsState.filter((item) => item.kind === word)); // Filter based on `newsState`
  }
};

useEffect(() => {
  const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || {};
  const updatedNewsState = newsData.map((item) => ({
    ...item,
    liked: !!storedLikes[item.id], // Restore liked status
    likes: storedLikes[item.id] || 0, // Restore likes count
  }));
  setNewsState(updatedNewsState);
  setCategory(updatedNewsState); // Update both states on initial load
}, []);

useEffect(() => {
  // Load the initial data from localStorage if it exists
  const savedCategory = JSON.parse(localStorage.getItem("newsCategory")) || newsData;
  setCategory(savedCategory);
}, []);
 


  const openPopup = (detail, description) => {
    setPopupContent({ description, detail });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };
  useEffect(() => {
    console.log('Popup State:', isPopupOpen);
    console.log('Popup Content:', popupContent);
  }, [isPopupOpen, popupContent]);
  
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleNavigate = () => {
     window.open('/myuserdata', '_blank'); // Open in new tab
  };

  const handleFavClick = () => {
    navigate('/favorites'); // Navigate to Favorites page
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to Profile page
  };

  const handleChangePassword = () => {
    navigate('/cpasspg');
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
    <div style={{ backgroundColor: '#2e2e2e', padding: '20px', minHeight: '100vh', position: 'relative', paddingTop: '20px' }}>
     
     {myname === 'Havel' && (

    <div>
      <button
        onClick={handleNavigate} // Show modal on button click
        style={{
          width: '70px',
          height: '70px',
          border: '5px solid #d4af37',
          borderRadius: '50%',
          position: 'fixed',
          right: '3em',
          top: '25em',
          cursor: 'pointer',
          backgroundColor: '#444',
          color: '#d4af37',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Add
      </button>

      {/* Show modal if isModalVisible is true */}
      {isModalVisible && (
        <AddDataModal
          onSubmit={handleFormSubmit}   // Pass the function for post-submission tasks
          onClose={handleModalClose}     // Pass the function to close the modal
        />
      )}
    </div>
)}

   
        {/* Navbar */}
        <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#444',
        padding: '10px 20px',
        position: 'fixed',
       
        left: '3em',
        right: '3em',
        zIndex: '1000',
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Left Section: Star and Favorites */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2
          onClick={handleFavClick}
          style={{
            color: '#d4af37',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize:'20px',
            margin: 0,
           
          }}
        >
          Favorites
        </h2>
      </div>

      <div>
    {myname && (
      <div style={{ color: '#d4af37', fontFamily: 'Georgia, serif', fontSize: '18px' }}>
        <span style={{position:'fixed',right:'7em',top:'2.15em'}}>{myname}</span>
        
      </div>
    )}
  </div>


      {/* Center Section: App Title */}
      <h1
        style={{
          color: '#d4af37',
          fontFamily: 'Georgia, serif',
          margin: 0,
          position: 'absolute', // Position it absolutely within the navbar
          left: '50%', // Move it to the center horizontally
          transform: 'translateX(-50%)', // Adjust for the width of the text
        }}
      >
      Havel News
      </h1>

{/* Right Section: Profile or Login Button */}
{myname ? (
  <img
    ref={profileRef}  // Add ref to the profile image
    src={nup}
    alt="Profile"
    onClick={toggleDropdown}
    style={{
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      border: '2px solid #d4af37',
      cursor: 'pointer',
    }}
  />
) : (
  <button
    onClick={handleLogin} // Trigger login when button is clicked
    style={{
      background: 'none',
      color: '#d4af37',
      padding: '8px 20px',
      border: '1px solid #d4af37',
      borderRadius: '5px',
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif',
    }}
  
  >
    Login
  </button>
)}

    </nav>

    {dropdownVisible && (
  <div
    ref={dropdownRef}
    style={{
      position: 'fixed',
      top: '88px',
      right: '46px',
      backgroundColor: '#444',
      borderRadius: '8px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      zIndex: '2000', // Ensure this is high enough
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
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#575757')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#444')}
        >
          My Profile
        </button>
      </li>
      {myname && (
        <li>
          <button
            onClick={handleChangePassword}
            style={{
              background: 'none',
              color: '#d4af37',
              padding: '8px 20px',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#575757')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#444')}
          >
            Change Password
          </button>
        </li>
      )}
      {/* Conditionally render the Login button */}
      {myname === '' && (
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
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#575757')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#444')}
          >
            Login
          </button>
        </li>
      )}
      <li>
        <button
          className="nuphov"
          onClick={handleLogout}
          style={{
            background: 'none',
            color: '#d4af37',
            padding: '8px 20px',
            border: 'none',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#575757')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#444')}
        >
          Log Out
        </button>
      </li>
    </ul>
  </div>
)}


      {/* News Section */}
      <section style={{ marginTop: '100px' }}>
        <div>
          <h2 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px' }}>
            {/* Today News */}
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
          <p className="desccss" onClick={() => openPopup(post.detail, post.description)} style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',  // Center horizontally
  textAlign: 'center',       // Ensure text is centered
  position: 'relative' ,
       // Keep the position for edit and delete icons
}}>
  {/* Left Edit Icon */}
  {myname === 'Havel' && (
    <img 
      src={edit} 
      alt="Edit" 
      style={{ width: '20px', height: '20px', position: 'absolute', left: '0.5em', cursor: 'pointer' }} 
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the popup when clicking the edit icon
        openEditForm(post);  // Open the edit form with the current post data
      }}
    />
  )}
  
  {/* Description Text */}
  {post.description}
  
  {/* Right Delete Icon */}
  {myname === 'Havel' && (
    <img 
      src={del}
      alt="Delete" 
      style={{ width: '20px', height: '20px', position: 'absolute', right: '0.5em', cursor: 'pointer' }} 
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the popup when clicking the delete icon
        handleDelete(post.id); 
      }}
    />
  )}

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
        strokeWidth="2"
        width="25"
                height="25"
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

{/* editing...................... */}

{editingPost && (
  <Modal show onHide={() => setEditingPost(null)}>
    <Modal.Header closeButton>
      <Modal.Title>Edit News</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleEditSubmit}>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleEditChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Kind:</label>
          <input
            type="text"
            name="kind"
            value={editFormData.kind}
            onChange={handleEditChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="img"
            value={editFormData.img}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Detail:</label>
          <textarea
            name="detail"
            value={editFormData.detail}
            onChange={handleEditChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </Modal.Body>
  </Modal>
)}






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
      <h4>{popupContent?.description}</h4>
      <p>{popupContent?.detail}</p>
      <button className="popup-close" onClick={closePopup}>
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
}

export default Data;