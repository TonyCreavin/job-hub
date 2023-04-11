import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DocumentList({ application, user }) {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [coverLetter, setCoverLetter] = useState(false);

  const getDocuments = async () => {
    const result = await axios.get('/api/document').catch((err) => {
      console.log('Error fetching documents:', err);
    });
    if (result) {
      setDocuments(result.data);
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
  }, []);

  const openDocument = (document) => {
    window.open(`/api/document/${document.id}`, '_blank');
  };

  return (
    <div
      className=" flex flex-col items-start border-solid overflow-scroll  border-gray-200 border-2 shadow-lg w-full h-[40vh] m-4 rounded-lg p-3 bg-white"
      key={application.id}
    >
      {/* <h3>userId: {application.userId}</h3>
      <h3>offerId: {application.offerId}</h3>
      <h3>application id: {application.id}</h3> */}
      <h3>
        name : {user.firstName} {user.lastName}
      </h3>

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
