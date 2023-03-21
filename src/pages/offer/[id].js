import React from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EditOffer from '@/components/editOffer';
import { useRouter } from 'next/router';
import JobDetailsPage from '@/components/JobDetailsPage';
import { useState } from 'react';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default function Offer(props) {
  const [showEditOfferModal, setShowEditOfferModal] = useState(false);

  const router = useRouter();
  const { offer } = props;

  async function handleDelete() {
    await axios.post('/api/offers/deleteOffer', { id: offer.id });
    router.push('/offers');
  }

  return (
    <div className="w-full">
      <JobDetailsPage
        title={offer?.title}
        key={offer?.id}
        location={offer?.location}
        contractType={offer?.contractType}
        skills={offer?.skills}
        description={offer?.description}
        consultant={offer?.consultant}
      />
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
      session,
    },
  };
}
