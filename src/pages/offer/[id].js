import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EditOffer from '../../components/EditOffer';
import { useRouter } from 'next/router';
import JobDetailsPage from '../../components/JobDetailsPage';
import UploadCv from '../../components/UploadCv';

import { getSession, useSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default function Offer({ offer }) {
  const [userData, setUserData] = React.useState({});
  const { data: session, status } = useSession();
  console.log('my session=>', session.user.id);
  const [showEditOfferModal, setShowEditOfferModal] = useState(false);
  //const [showApplicationModal, setShowApplicationModal] = useState(false);

  const router = useRouter();

  console.log('recreuiter user id', userData.role);

  async function handleDelete() {
    await axios.post('/api/offers/deleteOffer', { id: offer.id });
    router.push('/');
  }

  async function handleApplication() {
    await axios.post('/api/application/create', {
      userId: session.user.id,
      offerId: offer.id,

      coverLetter: 'this is my cover letter',
      favorite: false,
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
    <div className="w-full h-full">
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
      />
      {userData.role === 'CONSULTANT' && session.user.id === offer?.userId && (
        <div>
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
          //onClick={() => setShowApplicationModal((state) => !state)}
          onClick={handleApplication}
          className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2 mb-2"
        >
          Apply
        </button>
      )}
      {showEditOfferModal ? (
        <EditOffer
          offer={offer}
          closeModal={() => setShowEditOfferModal(false)}
        />
      ) : null}
      {/* {showApplicationModal && (
        <UploadCv handleApplication={handleApplication} />
      )} */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const session = await getSession(context);

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
    },
  };
}
