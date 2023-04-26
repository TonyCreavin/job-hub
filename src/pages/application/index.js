import ApplicationCard from '../../components/ApplicationCard';
import React from 'react';
import { PrismaClient } from '@prisma/client';
import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';

const prisma = new PrismaClient();

export default function Application({ applications }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="w-full h-full">
      <h2 className="text-center my-5">
        {!language ? 'Candidats' : 'Applicants'}
      </h2>
      {applications.map((application) => {
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
  const [applications, users] = await Promise.all([
    prisma.application.findMany({
      include: {
        user: true,
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
