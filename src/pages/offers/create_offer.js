import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Create_offer(props) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    website: '',
    contractType: '',
    description: '',
    skills: '',
    company: '',
    companyDescription: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = props.data.user.id;
    const response = await fetch('/api/offers/create', {
      method: 'POST',
      body: JSON.stringify({ ...formState, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log('this is my session =>', props.data.user.id);
  return (
    <div className="container">
      <div className="recruiter">
        <div style={{ width: '80vw', margin: 'auto' }}>
          <h2 className="text-center my-5">Post an offer</h2>

          <form className="row d-flex justify-content-around">
            <div className="col-md-6">
              <input
                type="text"
                value={formState.title}
                onChange={handleInputChange}
                className="form form-control"
                placeholder="Job title"
                style={{ marginBottom: '5vh' }}
                name="title"
                id="title"
              />{' '}
              <input
                value={formState.contractType}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder="contract type"
                style={{ marginBottom: '5vh' }}
                name="contractType"
                id="contractType"
              />{' '}
            </div>
            <div className="col-md-6">
              <input
                value={formState.company}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder="company"
                style={{ marginBottom: '5vh' }}
                name="company"
                id="company"
              />{' '}
              <input
                value={formState.location}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder="location"
                style={{ marginBottom: '5vh' }}
                name="location"
                id="location"
              />{' '}
            </div>
            <div className="col-12">
              <input
                value={formState.website}
                onChange={handleInputChange}
                type="text"
                className="form form-control"
                placeholder="website"
                style={{ marginBottom: '5vh' }}
                name="website"
                id="website"
              />
            </div>
            <div className="col-12">
              <textarea
                className="form form-control"
                value={formState.description}
                onChange={handleInputChange}
                id="description"
                cols="30"
                rows="10"
                name="description"
                placeholder="description"
                style={{ marginBottom: '5vh' }}
              ></textarea>
              <textarea
                className="form form-control"
                id="companyDescription"
                name="companyDescription"
                cols="30"
                rows="10"
                placeholder="company description"
                style={{ marginBottom: '5vh' }}
                value={formState.companyDescription}
                onChange={handleInputChange}
              ></textarea>

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
                style={{ width: '100%', marginBottom: '5vh' }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Create_offer;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('this is my session', session);

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
