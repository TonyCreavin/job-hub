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
      <br />
      <br /> <br />
      <div className="jobseeker">
        <div
          style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <h1>Profile</h1>
          <br /> <b></b>
          <form
            className="row d-flex justify-content-around"
            style={{}}
            action=""
          >
            <div className="col-6">
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  className="form form-control"
                  placeholder="firstname"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  name="firstName"
                  id="firstName"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="lastName">
                Lastname
                <input
                  type="text"
                  className="form form-control"
                  placeholder="lastname"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  id="lastName"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="tel"
                  className="form form-control"
                  placeholder="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  name="phone"
                  id="phone"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="github">
                Github
                <input
                  type="text"
                  className="form form-control"
                  placeholder="github"
                  value={formState.github}
                  onChange={handleInputChange}
                  name="github"
                  id="github"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="linkedin">
                Linkedin
                <input
                  type="text"
                  className="form form-control"
                  placeholder="linkedin"
                  value={formState.linkedin}
                  onChange={handleInputChange}
                  name="linkedin"
                  id="linkedin"
                  style={{ marginBottom: '20px' }}
                />
              </label>
            </div>
            <div className="col-6">
              <label htmlFor="skills">
                Skills
                <input
                  type="text"
                  className="form form-control"
                  placeholder="skills"
                  value={formState.skills}
                  onChange={handleInputChange}
                  name="skills"
                  id="skills"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="address">
                Address
                <input
                  type="text"
                  className="form form-control"
                  placeholder="address"
                  value={formState.address}
                  onChange={handleInputChange}
                  name="address"
                  id="address"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="city">
                City
                <input
                  type="text"
                  className="form form-control"
                  placeholder="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  name="city"
                  id="city"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="postcode">
                Postcode
                <input
                  type="text"
                  placeholder="postcode"
                  className="form form-control"
                  value={formState.postcode}
                  onChange={handleInputChange}
                  name="postcode"
                  id="postcode"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <label htmlFor="country">
                Country
                <input
                  type="text"
                  placeholder="country"
                  className="form form-control"
                  value={formState.country}
                  onChange={handleInputChange}
                  name="country"
                  id="country"
                  style={{ marginBottom: '20px' }}
                />
              </label>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary btn-block"
                style={{ width: '70%' }}
              >
                envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
