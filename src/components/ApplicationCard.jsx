import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';
import parser from 'html-react-parser';

export default function DocumentList({ application, user }) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [coverLetter, setCoverLetter] = useState(false);
  const [offer, setOffer] = useState({});

  const getDocuments = async () => {
    const result = await axios.get('/api/document').catch((err) => {
      console.log('Error fetching documents:', err);
    });
    if (result) {
      setDocuments(result.data);
    }
  };
  const getOffer = async () => {
    try {
      const result = await axios.get('/api/offers');
      const data = result.data.find(
        (offer) => offer.id === application.offerId
      );
      setOffer(data);
    } catch (err) {
      console.log('Error getting data', err);
    }
  };

  const deleteApplication = async () => {
    await axios.post(`/api/application/deleteApplication`, {
      id: application.id,
    });
    router.reload();
  };

  useEffect(() => {
    getDocuments();
    getOffer();
  }, []);

  const openDocument = (document) => {
    window.open(`/api/document/${document.id}`, '_blank');
  };

  return (
    <div className="w-full h-[30vh] flex flex-col items-center my-4 justify-center">
      <div
        className=" flex flex-col items-start border-solid overflow-scroll  border-gray-200 border-2  w-[90vw] h-[40vh] rounded-lg p-3 bg-white"
        key={application.id}
      >
        {offer.title && (
          <h3 className="text-black font-semibold font-serif" key={offer.id}>
            {offer.title}
          </h3>
        )}
        <h3 className="text-blue-400 font-normal text-md font-serif">
          {offer.company}
        </h3>
        <h3 className="font-serif text-[20px]">
          {!language ? 'candidat' : 'applicant'}: {user.firstName}{' '}
          {user.lastName}
        </h3>

        {documents
          .filter((doc) => doc.userId === application.userId)
          .map((document) => (
            <p key={document.id} onClick={() => openDocument(document)}>
              cv: {document.filename}
            </p>
          ))}

        <div className="flex flex-col items-start">
          <button
            onClick={() => setCoverLetter((coverLetter) => !coverLetter)}
            className="bg-green-500 text-white rounded-md w-60 h-7 mb-2"
          >
            {!language && coverLetter && 'Masquer la lettre de motivation'}
            {!language && !coverLetter && 'Afficher la lettre de motivation'}
            {language && coverLetter && 'Hide coverletter'}
            {language && !coverLetter && 'Show coverletter'}
          </button>

          {coverLetter && parser(application.coverLetter)}
        </div>
        <button
          onClick={deleteApplication}
          className="bg-red-500 text-white rounded-md w-20 h-7"
        >
          {!language ? 'supprimer' : 'delete'}
        </button>
      </div>
    </div>
  );
}
