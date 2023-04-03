import ApplicationCard from '../../components/ApplicationCard';
import React from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Application({ applications }) {
  return (
    <div className="w-full h-screen">
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
