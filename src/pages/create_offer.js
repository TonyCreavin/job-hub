import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

function Create_offer() {
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    website: '',
    contractType: '',
    description: '',
    skills: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(formState),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center my-5 text-2xl">Post a job</h1>
      <form className="flex flex-col w-full h-[100%]">
        <div className="flex m-4">
          <label htmlFor="title">
            Job Title
            <input
              value={formState.title}
              onChange={handleInputChange}
              className="mx-2"
              type="text"
              name="title"
              id="title"
            />
          </label>
          <label htmlFor="contractType">
            contract Type
            <input
              value={formState.contractType}
              onChange={handleInputChange}
              className="mx-2"
              type="text"
              name="contractType"
              id="contractType"
            />
          </label>
          <label htmlFor="location">
            location
            <input
              value={formState.location}
              onChange={handleInputChange}
              className="mx-2"
              type="text"
              name="location"
              id="location"
            />
          </label>
        </div>
        <div className="m-4 flex">
          <label htmlFor="skills">
            Skills
            <input
              value={formState.skills}
              onChange={handleInputChange}
              className="mx-2"
              type="text"
              name="skills"
              id="skills"
            />
          </label>
          <label htmlFor="website">
            website
            <input
              value={formState.website}
              onChange={handleInputChange}
              className="mx-2"
              type="text"
              name="website"
              id="website"
            />
          </label>
        </div>
        <div className="m-4">
          <h3>description</h3>
          <textarea
            className="w-full h-full p-2"
            id="description"
            name="description"
            rows="5"
            cols="33"
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-20 h-10 bg-sky-500  text-white m-3"
      >
        Submit
      </button>
    </>
  );
}

export default Create_offer;
