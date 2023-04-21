import React, { useEffect, useState } from 'react';
import UploadCv from '../../components/UploadCv';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EditOffer from '../../components/EditOffer';
import { useRouter } from 'next/router';
import JobDetailsPage from '../../components/JobDetailsPage';
import UploadCoverLetter from '../../components/UploadCoverLetter';
import fs from 'fs/promises';
import path from 'path';

import { getSession, useSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default function Offer({ offer, user, application, cvs }) {
  const [userData, setUserData] = React.useState({});
  const { data: session, status } = useSession();
  console.log('my session=>', session.user.id);
  const [showEditOfferModal, setShowEditOfferModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const router = useRouter();

  console.log('recreuiter user id', userData.role);

  async function handleDelete() {
    await axios.post('/api/offers/deleteOffer', { id: offer.id });
    router.push('/');
  }

  async function handleApplication(e) {
    e.preventDefault();

    await axios.post('/api/application/create', {
      userId: session.user.id,
      offerId: offer.id,
      coverLetter: coverLetter,
      applied: true,
    });
    router.push('/');
  }

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

  return (
    <div className="flex flex-col w-full h-full">
      <JobDetailsPage
        title={offer?.title}
        key={offer?.id}
        location={offer?.location}
        contractType={offer?.contractType}
        skills={offer?.skills}
        description={offer?.description}
        company={offer?.company}
        companyDescription={offer?.companyDescription}
        website={offer?.website}
        favorite={offer?.favorite}
        id={offer?.id}
        userId={offer?.userId}
      />
      {userData.role === 'CONSULTANT' && session.user.id === offer?.userId && (
        <div className="  mx-auto my-4">
          <button
            className="bg-red-500 ml-4 text-white rounded-md py-1 px-2 mb-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            onClick={() => setShowEditOfferModal((state) => !state)}
            className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2 mb-2"
          >
            Edit
          </button>
        </div>
      )}
      {session && userData.role === 'APPLICANT' && (
        <button
          onClick={() => setShowApplicationModal((state) => !state)}
          //onClick={handleApplication}
          className="bg-blue-500 w-40 mx-auto my-4 text-white rounded-md py-1 px-2 mb-2"
        >
          Start
        </button>
      )}
      {showApplicationModal && (
        <>
          <UploadCv
            cvs={cvs}
            setShowApplicationModal={setShowApplicationModal}
          />
          <UploadCoverLetter
            handleApplication={handleApplication}
            setCoverLetter={setCoverLetter}
            coverLetter={coverLetter}
            closeModal={() => setShowApplicationModal(false)}
            offer={offer}
            document={document}
            user={user}
            application={application}
          />

          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white w-32 h-7   mx-auto my-6"
            onClick={handleApplication}
          >
            Apply
          </button>
        </>
      )}

      {showEditOfferModal ? (
        <EditOffer
          offer={offer}
          closeModal={() => setShowEditOfferModal(false)}
        />
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const session = await getSession(context);
  const props = { cvs: [] };

  const cvs = await fs.readdir(path.join(process.env.CV_DIR));
  props.cvs = cvs;

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/',
        permanent: false,
      },
    };
  }
  const offer = await prisma.offer.findUnique({
    where: {
      id,
    },
  });

  return {
    props: {
      offer: JSON.parse(JSON.stringify(offer)),
      session: session,
      cvs: props.cvs,
    },
  };
}

//   const application = await prisma.application.findUnique({
//     where: {
//       id,
//     },
//   });
//   const offer = await prisma.offer.findUnique({
//     where: {
//       id,
//     },
//   });
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   const document = await prisma.document.findUnique({
//     where: {
//       id,
//     },
//   });

//   return {
//     props: {
//       application: JSON.parse(JSON.stringify(application)),
//       user: JSON.parse(JSON.stringify(user)),
//       document: JSON.parse(JSON.stringify(document)),
//       offer: JSON.parse(JSON.stringify(offer)),
//       session: session,
//     },
//   };
// }
