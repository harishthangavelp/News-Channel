import React from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the dynamic part of the URL
import newsData from '../Components/newsDetails.json';
import '../Components/NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();  // Get the 'id' from the URL parameters

  // Find the news post that matches the id
  const post = newsData.find((item) => item.id === id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div style={{ backgroundColor: '#2e2e2e', padding: '20px', borderRadius: '10px', minHeight: '100vh' }}>
      <section>
        <h2 style={{ color: '#d4af37', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
          {post.title}
        </h2>
        <div className="news-detail-container">
          <img
            src={post.img}
            style={{ objectFit: 'cover', width: '100%' }}
            width="100%"
            height="auto"
            alt={post.title}
          />
          <p style={{ color: '#d4af37', fontSize: '18px', fontFamily: 'Arial, sans-serif', marginTop: '20px' }}>
            {post.description}
          </p>
          <p style={{ color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
            {post.detail}
          </p>
          
          {/* Add any extra content you like */}
          <div className="extra-content">
            <h3>Additional Information</h3>
            <p>Some extra content here...</p>
            {/* You can add features like comments, related posts, etc. */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;
