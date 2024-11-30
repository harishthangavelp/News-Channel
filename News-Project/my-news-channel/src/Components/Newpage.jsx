import React from 'react'
import { useState } from 'react'
import {collectionData} from ''



const Newpage = () => {


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

    const [category, setCategory] = useState(collectionData);
    const sources = (e) => {
    let word=e.target.value;
     
    if(word === "all"){
      setCategory(collectionData)
    }
    else if(word === "breaking") {
        const filtered = collectionData.filter(item=>item.kind === "breaking");
        setCategory(filtered)
    }
    else if(word === "cinema") {
      const filtered = collectionData.filter(item=>item.kind === "cinema");
      setCategory(filtered)
    }
  }

  return (
    <>
      <section>
        <div>
          <h2>Today News</h2>
          <div>
            <button value="all" onClick={sources}>All News</button>
            <button value="breaking" onClick={sources}>Breaking News</button>
            <button value="cinema" onClick={sources}>Cinema News</button>
          </div>
 
          <div>
            {category.map((item) => (
              <div key={item.id}>
                <div>
                  <img src={item.img} alt={item.title} />
                  <div>
                    <h1>{item.title}</h1>
                     <p>{item.description} </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Newpage