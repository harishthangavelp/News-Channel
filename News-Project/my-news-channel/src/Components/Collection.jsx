import React from 'react'
import { useState } from 'react'
import {collectionData} from '../Components/news'



const Collection = () => {
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

export default Collection