import React, { useState } from 'react';

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

    const response = await fetch('/api/offer/create', {
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
      <h1 className="text-center my-5 text-2xl">Post a job</h1>
      <div className="flex justify-center align-middle items-center ml-[30vw] mr-[30vw]">
        <form className="flex flex-col w-full h-[100%] ">
          <div className="flex m-4 justify-between">
            <label htmlFor="title">
              Job Title
              <input
                value={formState.title}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
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
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="contractType"
                id="contractType"
              />
            </label>{' '}
          </div>
          <div className="flex m-4 justify-between">
            <label htmlFor="location">
              location
              <input
                value={formState.location}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="location"
                id="location"
              />
            </label>

            <label htmlFor="skills">
              Skills
              <input
                value={formState.skills}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="skills"
                id="skills"
              />
            </label>
          </div>
          <div>
            <label htmlFor="website" className="flex flex-col m-4 rounded-md">
              website
              <input
                value={formState.website}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-[40%] rounded-md"
                type="text"
                name="website"
                id="website"
              />
            </label>
          </div>
          <div className="m-4">
            <h3>description</h3>
            <textarea
              className="w-full h-full p-2 border-gray-200 border-2 shadow-lg rounded-md"
              id="description"
              name="description"
              rows="5"
              cols="33"
              value={formState.description}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-20 h-10 bg-sky-500  text-white m-3 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Create_offer;
