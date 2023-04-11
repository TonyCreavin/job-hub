import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DocumentList({ application, user }) {
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
    <div
      className=" flex flex-col items-start border-solid overflow-scroll  border-gray-200 border-2  w-[90vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
      key={application.id}
    >
      {/* <h3>userId: {application.userId}</h3>
      <h3>offerId: {application.offerId}</h3>
      <h3>application id: {application.id}</h3> */}
      <h3>
        name : {user.firstName} {user.lastName}
      </h3>
      {/* <h3>offerId : {application.offerId}</h3> */}
      {offer.title && <h3 key={offer.id}>offer : {offer.title}</h3>}
      <h3>company : {offer.company}</h3>

      {documents
        .filter((doc) => doc.userId === application.userId)
        .map((document) => (
          <p key={document.id} onClick={() => openDocument(document)}>
            cv: {document.filename}
          </p>
        ))}

      <div className="flex flex-col items-start">
        <button onClick={() => setCoverLetter((coverLetter) => !coverLetter)}>
          {coverLetter ? 'hide coverletter' : 'show coverletter'}
        </button>

        {coverLetter && application.coverLetter}
      </div>
      <button onClick={deleteApplication}>delete</button>
    </div>
  );
}
