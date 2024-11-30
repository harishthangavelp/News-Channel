import React, { useState } from 'react';
import newsData from '../Components/newsDetails.json';
import '../Components/Data.css';

function Data() {
  const [category, setCategory] = useState(newsData);
  const [popupContent, setPopupContent] = useState(null);  // State for popup content
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // State for popup visibility

  const handleFilterChange = (e) => {
    const word = e.target.value;

    if (word === "all") {
      setCategory(newsData);
    } else {
      const filtered = newsData.filter((item) => item.kind === word);
      setCategory(filtered);
    }
  };

  // Function to open popup with the post details
  const openPopup = (detail, description) => {
    setPopupContent({ description, detail });  // Save both description and detail for the popup
    setIsPopupOpen(true);
  };

  // Function to close popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <div style={{ backgroundColor: '#2e2e2e', padding: '20px', borderRadius: '10px', minHeight: '100vh' }}>
      <section>
        <div>
          <h2 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px' }}>
            Today News
          </h2>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label htmlFor="category-select" style={{ color: '#d4af37', fontFamily: 'Georgia, serif', fontSize: '18px' }}>
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

      <div className="card-container">
        {category.map((post) => (
          <div className="homecard" key={post.id}>
            <img
              src={post.img}
              style={{ objectFit: 'cover', width: '100%' }}
              width="384px"
              height="240px"
              alt={post.title}
            />
            <p className="desccss" onClick={() => openPopup(post.detail, post.description)}>
              {post.description}
            </p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{popupContent.description}</h3> {/* Display the description here */}
            <p>{popupContent.detail}</p> {/* Display the full post detail here */}
            <button onClick={closePopup} className="popup-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;
