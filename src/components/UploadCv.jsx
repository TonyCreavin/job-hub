import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import LanguageContext from '../LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ cvs }) {
  const { language } = useContext(LanguageContext);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();
  const [documents, setDocuments] = useState([]);
  const [application, setApplication] = useState([]);

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
  const popupmessage = !language ? 'CV téléchargé 😁' : 'CV uploaded 😁';
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

      await getDocuments();
      setSelectedFile(null);
      setUploading(false);
      toast(popupmessage, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  const deleteCv = async (id) => {
    try {
      await axios.post(`/api/document/_delete/`, { id });
      getDocuments();
      console.log('CV deleted successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.log('Error deleting CV:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleUpload}
        encType="multipart/form-data"
        className="flex flex-col items-center justify-center "
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
              <h3 className="text-center mb-3 font-serif">
                {!language ? 'Télécharger votre CV' : 'Upload your Cv'}
              </h3>
              <p className="text-red-500 text-right">
                {!language ? '* un seul CV autorisé' : '* only one CV allowed'}
              </p>
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
                      className=" w-20 h-[4vh] bg-red-500 text-white rounded-md  mb-2 "
                    >
                      {!language ? 'Supprimer' : 'Delete'}
                    </button>
                  </div>
                ))}

              <div className="w-[80vw] md:w-[40vw] aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
                {selectedImage ? (
                  <span>{!language ? 'CV Sélectionné' : 'CV Selected'}</span>
                ) : (
                  <span>{!language ? 'Sélectionner CV' : 'Select CV'}</span>
                )}
              </div>
            </label>
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{ opacity: uploading ? '.5' : '1' }}
              className="w-[80vw] md:w-[40vw] bg-blue-500 h-[7vh] text-white rounded-lg"
            >
              {!language && uploading && 'Sauvegarde en cours...'}
              {!language && !uploading && 'Sauvegarder'}
              {language && uploading && 'Uploading...'}
              {language && !uploading && 'Upload'}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
