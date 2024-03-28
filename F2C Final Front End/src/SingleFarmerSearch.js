import React, { useState } from 'react';
import { Link  } from 'react-router-dom';

const SingleFarmerSearch = () => {
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
      setName(e.target.value);
    };
  
    return (
      <div>
        <h1>First Page</h1>
        <input type="text" value={name} onChange={handleInputChange} />
        <Link to={`/singleDisplay/${name}`}>
          <button>Go to Second Page</button>
        </Link>
      </div>
    );
};

export default SingleFarmerSearch;
