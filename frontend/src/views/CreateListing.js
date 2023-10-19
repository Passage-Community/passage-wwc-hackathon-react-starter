import React from 'react'
import axios from 'axios'
import { Passage, Session, User } from '@passageidentity/passage-js';
import { useNavigate } from "react-router-dom";

// const passage = new Passage(process.env.REACT_APP_PASSAGE_APP_ID);
// const user = passage.getCurrentUser()
// const userInfo = await user.userInfo()
// // const { id, user_metadata } = await user.userInfo()
// console.log({userInfo})

export default function CreateListing() {
    const navigate = useNavigate();
    // check to see if user has auth token
    if (!userInfo) navigate('/')

    const [listing, setListing] = React.useState ({
        userId: id,
        username: user_metadata.username,
        firstname: user_metadata.first_name,
        zipcode: user_metadata.zip_code,
        category: '',
        title: '',
        text: '',
        // does this need to be a string or number
        price: '',
        unit: '',
        image: '',
    })
    
    // get userID and other info to pre-populate form

    // POST form data to DB
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      const form = e.target;
      const formData = new FormData(form);
    };

    // handle form changes, manage state
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
        //   onChange={handleChange} - non-editable field
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
        //   onChange={handleChange} - non-editable field
        />
      </div>
      <div>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="number"
          id="zipCode"
          value={zipCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={handleChange}>
          <option value="">Select category</option>
          {/* Add options for categories */}
        </select>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="text">Description</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="unit">Unit</label>
        <select id="unit" value={unit} onChange={handleChange}>
          <option value="">Select unit</option>
          {/* Add options for units */}
        </select>
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      {/* need cancel button */}
    </form>
  );
};



