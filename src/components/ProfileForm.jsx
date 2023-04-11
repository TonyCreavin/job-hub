import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function ProfileForm({
  userData,

  session,
}) {
  const [formState, setFormState] = useState(userData);
  console.log(
    'this is is??, ',
    userData.firstName,
    formState.firstName,
    session?.user.id
  );

  const handleInputChange = (event) => {
    console.log('event.target.name => ', event.target.name);
    console.log('event.target.value => ', event.target.value);

    setFormState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/user/editUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        id: session?.user.id,
        firstName: formState.firstName,
        lastName: formState.lastName,
        phone: formState.phone,
        github: formState.github,
        linkedin: formState.linkedin,
        skills: formState.skills,
        address: formState.address,
        city: formState.city,
        postcode: formState.postcode,
        country: formState.country,
      }),
    });
  };

  return (
    <div className="container">
      <div className="jobseeker">
        <div style={{ width: '80vw', margin: 'auto' }}>
          <h1 className="text-center my-4">Profile</h1>

          <div className="flex flex-col md:flex-row  justify-between  gap-[2vw]">
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="firstName"></label>
              First Name
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="firstname"
                value={formState.firstName || ''}
                onChange={handleInputChange}
                name="firstName"
                id="firstName"
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="lastName"></label>
              Lastname
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="lastname"
                value={formState.lastName || ''}
                onChange={handleInputChange}
                name="lastName"
                id="lastName"
                style={{ marginBottom: '20px' }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="phone"> </label>
              Phone
              <input
                type="tel"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="phone"
                value={formState.phone || ''}
                onChange={handleInputChange}
                name="phone"
                id="phone"
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="github"> </label>
              Github
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="github"
                value={formState.github || ''}
                onChange={handleInputChange}
                name="github"
                id="github"
                style={{ marginBottom: '20px' }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="linkedin"> </label>
              Linkedin
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="linkedin"
                value={formState.linkedin || ''}
                onChange={handleInputChange}
                name="linkedin"
                id="linkedin"
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="skills"> </label>
              Skills
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="skills"
                value={formState.skills || ''}
                onChange={handleInputChange}
                name="skills"
                id="skills"
                style={{ marginBottom: '20px' }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="address"> </label>
              Address
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                placeholder="address"
                value={formState.address || ''}
                onChange={handleInputChange}
                name="address"
                id="address"
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="city"> </label>
              City
              <input
                type="text"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white  "
                placeholder="city"
                value={formState.city || ''}
                onChange={handleInputChange}
                name="city"
                id="city"
                style={{ marginBottom: '20px' }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row  justify-between gap-[2vw]">
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="postcode"> </label>
              Postcode
              <input
                type="text"
                placeholder="postcode"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                value={formState.postcode || ''}
                onChange={handleInputChange}
                name="postcode"
                id="postcode"
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="flex flex-col  mb-2  ">
              <label htmlFor="country"> </label>
              Country
              <input
                type="text"
                placeholder="country"
                className="border-solid border-gray-200 border-2  w-[80vw] md:w-[40vw] h-[7vh]  rounded-lg p-3 bg-white "
                value={formState.country || ''}
                onChange={handleInputChange}
                name="country"
                id="country"
                style={{ marginBottom: '30px' }}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-[80vw] md:w-[40vw] bg-blue-500 h-[7vh] text-white rounded-lg mb-4"
          >
            envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
