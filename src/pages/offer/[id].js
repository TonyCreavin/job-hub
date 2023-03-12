import React from 'react';
import { PrismaClient } from '@prisma/client';

import { useRouter } from 'next/router';
import JobDetailsPage from '@/components/JobDetailsPage';

const prisma = new PrismaClient();

export default function Offer(props) {
  const router = useRouter();
  const { offer } = props;

  return (
    <div className="w-full">
      <JobDetailsPage
        title={offer.title}
        key={offer.id}
        location={offer.location}
        contractType={offer.contractType}
        skills={offer.skills}
        description={offer.description}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const offer = await prisma.offer.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return {
    props: {
      offer: JSON.parse(JSON.stringify(offer)),
    },
  };
}
