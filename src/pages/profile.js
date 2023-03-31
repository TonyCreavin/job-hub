import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import fs from 'fs/promises';
import axios from 'axios';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useSession, getSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ cvs }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [userData, setUserData] = React.useState({});
  const { data: session, status } = useSession();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    github: '',
    linkedin: '',
    skills: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
  });
  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          console.log('res.data => ', res.data);
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [session?.user.id]);
  console.log('userData => ', userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/user/editUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        id: session.user.id,
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
    })
      .then((res) => {
        console.log('res.data => ', res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log('this is my session');

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myCv', selectedFile);
      const { data } = await axios.post('/api/document', formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  console.log('thiqqqs is my session', userData);
  return (
    <>
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
                    placeholder={userData.firstName}
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
                    placeholder={userData.lastName}
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
                    placeholder={userData.phone}
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
                    placeholder={userData.github}
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
                    placeholder={userData.linkedin}
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
                    placeholder={userData.skills}
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
                    placeholder={userData.address}
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
                    placeholder={userData.city}
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
                    placeholder={userData.postcode}
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
                    placeholder={userData.country}
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

      <div className="max-w-4xl mx-auto p-20 space-y-6 flex flex-col">
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];

                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />
          <div className="w-40 aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
            {selectedImage ? (
              <Image src={selectedImage} alt="" width={500} height={500} />
            ) : (
              <span>Select CV</span>
            )}
          </div>
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ opacity: uploading ? '.5' : '1' }}
          className="bg-blue-500 text-white p-3 w-32 text-center rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <div className="mt-20 flex flex-col space-y-3">
          {cvs.map((item) => (
            <Link key={item} href={process.env.CV_DIR + item}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const props = { cvs: [] };
  try {
    const cvs = await fs.readdir(process.env.CV_DIR);
    props.cvs = cvs;

    return { props };
  } catch (error) {
    console.log(error);
    return { props };
  }
};
