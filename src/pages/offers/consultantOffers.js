import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import JobPost from '../../components/JobPosts';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LanguageContext from '../../LanguageContext';
import prisma from '../../../lib/prisma';

const inter = Inter({ subsets: ['latin'] });

export default function ConsultantOffers({ offers }) {
  const { language } = useContext(LanguageContext);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [session?.user.id]);

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
export async function getServerSideProps() {
  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return {
    props: {
      offers: JSON.parse(JSON.stringify(offers)),
    },
  };
}
