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
          {/* <form
            className="row d-flex justify-content-around"
            style={{}}
            action=""
          > */}
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  className="form form-control"
                  placeholder="firstname"
                  value={formState.firstName || null}
                  onChange={handleInputChange}
                  name="firstName"
                  id="firstName"
                  style={{ marginBottom: '20px' }}
                />
              </label>
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <label htmlFor="lastName">
                Lastname
                <input
                  type="text"
                  className="form form-control"
                  placeholder="lastname"
                  value={formState.lastName || null}
                  onChange={handleInputChange}
                  name="lastName"
                  id="lastName"
                  style={{ marginBottom: '20px' }}
                />
              </label>
            </div>
            <div className="row my-3">
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="phone">
                  Phone
                  <input
                    type="tel"
                    className="form form-control"
                    placeholder="phone"
                    value={formState.phone || null}
                    onChange={handleInputChange}
                    name="phone"
                    id="phone"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="github">
                  Github
                  <input
                    type="text"
                    className="form form-control"
                    placeholder="github"
                    value={formState.github || null}
                    onChange={handleInputChange}
                    name="github"
                    id="github"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="linkedin">
                  Linkedin
                  <input
                    type="text"
                    className="form form-control"
                    placeholder="linkedin"
                    value={formState.linkedin || null}
                    onChange={handleInputChange}
                    name="linkedin"
                    id="linkedin"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="skills">
                  Skills
                  <input
                    type="text"
                    className="form form-control"
                    placeholder="skills"
                    value={formState.skills || null}
                    onChange={handleInputChange}
                    name="skills"
                    id="skills"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="address">
                  Address
                  <input
                    type="text"
                    className="form form-control"
                    placeholder="address"
                    value={formState.address || null}
                    onChange={handleInputChange}
                    name="address"
                    id="address"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="city">
                  City
                  <input
                    type="text"
                    className="form form-control"
                    placeholder="city"
                    value={formState.city || null}
                    onChange={handleInputChange}
                    name="city"
                    id="city"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="postcode">
                  Postcode
                  <input
                    type="text"
                    placeholder="postcode"
                    className="form form-control"
                    value={formState.postcode || null}
                    onChange={handleInputChange}
                    name="postcode"
                    id="postcode"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2 col-sm-12">
                <label htmlFor="country">
                  Country
                  <input
                    type="text"
                    placeholder="country"
                    className="form form-control"
                    value={formState.country || null}
                    onChange={handleInputChange}
                    name="country"
                    id="country"
                    style={{ marginBottom: '20px' }}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary  mb-3"
              //style={{ width: '70%' }}
            >
              envoyer
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
