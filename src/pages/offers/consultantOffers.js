import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import JobPost from '../../components/JobPosts';
import { PrismaClient } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';
const prisma = new PrismaClient();

const inter = Inter({ subsets: ['latin'] });

export default function ConsultantOffers({ offers }) {
  const { language } = useContext(LanguageContext);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  console.log('inter', userData);

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

  return (
    <>
      <div className="w-full h-screen overflow-y-scroll">
        <h2 className="text-center my-5">
          {!language ? 'Mes Offres' : 'My Offers'}
        </h2>
        <div className="flex flex-wrap w-full h-screen">
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
