import React, { useState } from 'react';
import { getSession } from 'next-auth/react';

export default function CompanyDetails(props) {
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    website: '',
    postcode: '',
    description: '',
    city: '',
    country: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/company/createCompany', {
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
      <h1 className="text-center my-5 text-2xl">Company details</h1>
      <div className="flex justify-center align-middle items-center ml-[30vw] mr-[30vw]">
        <form className="flex flex-col w-full h-[100%] ">
          <div className="flex m-4 justify-between">
            <label htmlFor="name">
              Name
              <input
                value={formState.name}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="name"
                id="name"
              />
            </label>
            <label htmlFor="address">
              Address
              <input
                value={formState.address}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="address"
                id="address"
              />
            </label>{' '}
          </div>
          <div className="flex m-4 justify-between">
            <label htmlFor="website">
              website
              <input
                value={formState.website}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="website"
                id="website"
              />
            </label>

            <label htmlFor="postcode">
              Postcode
              <input
                value={formState.postcode}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-full rounded-md"
                type="text"
                name="postcode"
                id="postcode"
              />
            </label>
          </div>
          <div>
            <label htmlFor="city" className="flex flex-col m-4 rounded-md">
              city
              <input
                value={formState.city}
                onChange={handleInputChange}
                className="border-gray-200 border-2 shadow-lg w-[40%] rounded-md"
                type="text"
                name="city"
                id="city"
              />
            </label>
          </div>
          <label htmlFor="country">
            country
            <input
              value={formState.country}
              onChange={handleInputChange}
              className="border-gray-200 border-2 shadow-lg w-full rounded-md"
              type="text"
              name="country"
              id="country"
            />
          </label>

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
            Next
          </button>
        </form>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('this is my session data', session);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/',
        permanent: false,
      },
    };
  }

  return {
    props: { session, data: session },
  };
}
