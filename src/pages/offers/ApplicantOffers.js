import ApplicationCard from '../../components/ApplicationCard';
import React, { useEffect, useState, useContext } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import LanguageContext from '../../LanguageContext';

const prisma = new PrismaClient();

export default function Application({ applications }) {
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
    <div className="w-full h-screen overflow-scroll">
      <h2 className="text-center my-5 font-serif">
        {!language ? 'Mes Candidatures' : 'My Applications'}
      </h2>
      {applications
        .filter((application) => application.userId === userData.id)
        .map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              user={application.user}
            />
          );
        })}
    </div>
  );
}
export async function getServerSideProps() {
  const [applications, users, offers] = await Promise.all([
    prisma.application.findMany({
      include: {
        user: true,
        offer: true,
      },
    }),
    prisma.user.findMany(),
  ]);

  return {
    props: {
      applications: JSON.parse(JSON.stringify(applications)),
    },
  };
}
