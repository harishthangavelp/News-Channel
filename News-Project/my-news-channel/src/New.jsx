import React, { useState, useEffect } from 'react';
import '../src/Components/Data.css';

function New() {
  // Define state for data, loading, and error
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data in useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/3944026f-5bbf-48ee-918e-526a90ee305f'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Store the fetched data
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false once request is done
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this only runs on mount

  // Render based on loading, error, and data states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>







      <div className="card-container">
        {data.map((post, index) => (
          <div key={index} className="homecard">
            <h5 className="hometitle">{post.title}</h5>
            <img src={post.img} style={{ objectFit: 'cover', width: '100%' }} width="384px" height="240px" alt="..." />
            <p>{post.description}</p>
            <a href="#">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default New;
