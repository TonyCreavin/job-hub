import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import fs from 'fs/promises';
import axios from 'axios';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ProfileForm from '../components/ProfileForm';
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

  useEffect(() => {
    getDocuments();
  }, []);

  const openDocument = (document) => {
    window.open(`/api/document/${document.id}`, '_blank');
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myCv', selectedFile);
      const { data } = await axios.post('/api/document/create', formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
    router.push('/profile');
  };
  console.log('this is my session', userData);

  console.log('files => ', process.env.CV_DIR);

  const deleteCv = async (id) => {
    try {
      await axios.delete(`/api/document/_delete/${id}`);
      getDocuments();
      console.log('CV deleted successfully!');
    } catch (error) {
      console.log('Error deleting CV:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <ProfileForm userData={userData} key={userData.id} session={session} />

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
            {documents
              .filter((doc) => doc.userId === session?.user.id)
              .map((document) => (
                <div key={document.id}>
                  {' '}
                  <p onClick={() => openDocument(document)}>
                    CV: {document.filename}
                  </p>
                  <button
                    onClick={() => deleteCv(document.id)}
                    className="mb-2"
                  >
                    Delete
                  </button>
                </div>
              ))}

            <div className="w-40 aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
              {selectedImage ? (
                // <Image src={selectedImage} alt="" width={500} height={500} />
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
            className="bg-blue-500 text-white p-3 w-32 text-center rounded"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {
            // <div className="mt-20 flex flex-col space-y-3">
            //   {cvs.map((item) => (
            //     <Link key={item} href={process.env.CV_DIR + item}>
            //       {item}
            //     </Link>
            //   ))}
            // </div>
          }
        </div>
      </form>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const props = { cvs: [] };
  try {
    const cvs = await fs.readdir(path.join(process.env.CV_DIR));
    props.cvs = cvs;

    return { props };
  } catch (error) {
    console.log(error);
    return { props };
  }
};
