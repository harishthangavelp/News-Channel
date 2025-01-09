import React, { useEffect, useState } from 'react';
import newsData from '../Components/newsDetails.json';
import '../Components/Data.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [popupContent, setPopupContent] = useState(null); // State for popup content
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || {};
    const likedItems = newsData
      .filter(item => storedLikes[item.id])
      .map(item => ({
        ...item,
        liked: true,
        likes: storedLikes[item.id],
      }));
    setFavorites(likedItems);
  }, []);

  const openPopup = (detail, description) => {
    setPopupContent({ description, detail });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <div style={{ backgroundColor: '#2e2e2e', padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center', fontFamily: 'Georgia, serif' }}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <div style={{ color: '#d4af37', textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>
          No favorites available
        </div>
      ) : (
        <div className="card-container">
          {favorites.map(post => (
            <div className="homecard" key={post.id} style={{ position: 'relative' }}>
              <img
                src={post.img}
                alt={post.title}
                width="384px"
                height="240px"
                style={{ objectFit: 'cover' }}
              />
              <p className="desccss" onClick={() => openPopup(post.detail, post.description)}>
                {post.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#d4af37',
                    fontFamily: 'Arial, sans-serif',
                    position: 'absolute',
                    top: '3em',
                    right: '0.5em',
                  }}
                >
                  
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default Favorites;
