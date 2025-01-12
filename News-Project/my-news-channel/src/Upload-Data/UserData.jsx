import React, { useState } from 'react';
import '../Upload-Data/UserData.css';

function UserData({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    kind: '',
    img: '',
    detail: '',
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchNews = async () => {
    const response = await fetch('https://news-channel-14.onrender.com/getNews');
    const data = await response.json();
    setNewsData(data); // Update state with the latest data
  };
  
  // Call fetchNews after form submission to refresh the news data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://news-channel-14.onrender.com/addNews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
  
      // Fetch updated news after submitting new data
      fetchNews();
  
      setFormData({ id: '', description: '', kind: '', img: '', detail: '' });
      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 1000);
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting data');
    }
  };
  

  return (
    <>
      <div className='userdatabg'>
        <div className="userdata-container">
          <h2 className="userdata-title">Add New Data</h2>
          <form onSubmit={handleSubmit} className="userdata-form">
          <label className="userdata-label">
              Id:
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="userdata-input"
              />
            </label>
            <label className="userdata-label">
              Description:
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="userdata-input"
              />
            </label>
            <label className="userdata-label">
              Kind:
              <select
                name="kind"
                value={formData.kind}
                onChange={handleChange}
                required
                className="userdata-input" 
              >
                <option value="" >Select a Category</option>
                <option value="all">All</option>
                <option value="latest">Latest</option>
                <option value="general">General</option>
                <option value="breaking">Breaking</option>
                <option value="cinema">Cinema</option>
                <option value="entertainment">Entertainment</option>
                <option value="weather">Weather</option>
              </select>
            </label>
            <label className="userdata-label">
              Image URL:
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                required
                className="userdata-input"
              />
            </label>
            <label className="userdata-label">
              Detail:
              <input
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                required
                className="userdata-input"
              />
            </label>
            <button
              type="submit"
              className="userdata-button"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Popup Message */}
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Successfully Posted</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserData;
