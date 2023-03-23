import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EditOffer from '@/components/editOffer';
import { useRouter } from 'next/router';
import JobDetailsPage from '@/components/JobDetailsPage';

import { getSession, useSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default function Offer({ offer }) {
  const [userData, setUserData] = React.useState({});
  const { data: session, status } = useSession();
  console.log('my session=>', session.user.id);
  const [showEditOfferModal, setShowEditOfferModal] = useState(false);

  const router = useRouter();
  //const { offer } = props;
  //console.log session.user.id
  console.log('recreuiter user id', userData.role);

  console.log('3333333', session);
  async function handleDelete() {
    await axios.post('/api/offers/deleteOffer', { id: offer.id });
    router.push('/offers');
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
    <div className="w-full">
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
            className="bg-red-500 ml-4 text-white rounded-md py-1 px-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            onClick={() => setShowEditOfferModal((pV) => !pV)}
            className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2"
          >
            Edit
          </button>
        </div>
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

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
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
