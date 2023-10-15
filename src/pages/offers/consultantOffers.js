import { Inter } from 'next/font/google';
import { getSession } from 'next-auth/react';
import JobPost from '../../components/JobPosts';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../../LanguageContext';
import prisma from '../../../lib/prisma';

const inter = Inter({ subsets: ['latin'] });

export default function ConsultantOffers({ offers, data }) {
  const { language } = useContext(LanguageContext);
  // const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const session = data;
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [data?.user.id]);

  return (
    <>
      <div className="w-full h-screen overflow-y-scroll">
        <h2 className="text-center my-5 font-serif">
          {!language ? 'Mes Offres' : 'My Offers'}
        </h2>
        <div className="flex flex-wrap w-full h-screen justify-center">
          {offers.map(
            (offer) =>
              userData.role === 'CONSULTANT' &&
              userData.id === offer.userId && (
                <JobPost key={offer.id} offer={offer} />
              )
          )}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/',
        permanent: false,
      },
    };
  }
  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return {
    props: {
      session,
      data: session,
      offers: JSON.parse(JSON.stringify(offers)),
    },
  };
}
