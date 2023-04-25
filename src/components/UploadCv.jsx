import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

import { Inter } from 'next/font/google';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import path from 'path';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ cvs }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [userData, setUserData] = React.useState({});
  const { data: session, status } = useSession();
  const [documents, setDocuments] = useState([]);
  const [application, setApplication] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  const getDocuments = async () => {
    const result = await axios.get('/api/document').catch((err) => {
      console.log('Error fetching documents:', err);
    });
    if (result) {
      setDocuments(result.data);
    }
  };
  //   const getApplicants = async () => {
  //     const result = await axios.get('/api/application').catch((err) => {
  //       console.log('Error fetching applicants:', err);
  //     });
  //     if (result) {
  //       setApplication(result.data);
  //     }
  //   };

  useEffect(() => {
    getDocuments();
    // getApplicants();
  }, []);

  const openDocument = (document) => {
    window.open(`/api/document/${document.id}`, '_blank');
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const existingCv = documents.find(
        (doc) => doc.userId === application.userId
      );
      if (existingCv) return;
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myCv', selectedFile);
      const { data } = await axios.post('/api/document/create', formData);
      console.log(data);
      await getDocuments();
      setSelectedFile(null);
      setUploading(false);
      toast('CV uploaded', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  console.log('this is my session', userData);

  console.log('files => ', process.env.CV_DIR);

  const deleteCv = async (id) => {
    console.log('id');
    try {
      await axios.post(`/api/document/_delete/`, { id });
      getDocuments();
      console.log('CV deleted successfully!');
      setSelectedFile(null);
      //router.push('/profile');
    } catch (error) {
      console.log('Error deleting CV:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        encType="multipart/form-data"
        className="flex flex-col items-center justify-center"
      >
        {session && userData?.role === 'APPLICANT' && (
          <div className="max-w-4xl mx-auto py-20 space-y-6 flex flex-col">
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
              <h3 className="text-center mb-3">Upload you CV</h3>
              {documents
                .filter((doc) => doc.userId === session?.user.id)
                .map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-row justify-between border-2 border-solid rounded-md p-2"
                  >
                    {' '}
                    <p onClick={() => openDocument(document)}>
                      CV: {document.filename}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteCv(document.id)}
                      className=" w-16 h-[4vh] bg-red-500 text-white rounded-md  mb-2 "
                    >
                      Delete
                    </button>
                  </div>
                ))}

              <div className="w-[80vw] md:w-[40vw] aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
                {errorMessage && <p>{errorMessage}</p>}
                {selectedImage ? (
                  <span>CV Selected</span>
                ) : (
                  <span>Select CV</span>
                )}
              </div>
            </label>
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{ opacity: uploading ? '.5' : '1' }}
              className="w-[80vw] md:w-[40vw] bg-blue-500 h-[7vh] text-white rounded-lg"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
