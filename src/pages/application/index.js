import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import CandidateCard from '../../components/CandidateCard';
import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';

export default function ConsultantsApplications({ applications, offers }) {
  const { language } = useContext(LanguageContext);
  const { data: session, status } = useSession();
  const [filteredOffers, setFilteredOffers] = useState([]);

  console.log('musession', session);
  console.log('applications', applications);

  useEffect(() => {
    if (offers && Array.isArray(offers)) {
      const filteredOffers = offers.filter(
        (offer) => offer.userId === session?.user.id
      );
      console.log('filteredOffers', filteredOffers);
      setFilteredOffers(filteredOffers);
    }
  }, [offers, session]);

  const filteredApplications = applications.filter((application) =>
    filteredOffers.some((offer) => offer.id === application.offerId)
  );

  console.log('filteredApplications', filteredApplications);

  return (
    <div className="w-full h-screen overflow-scroll">
      <h2 className="text-center my-5 font-serif">
        {!language ? 'Candidats' : 'Applicants'}
      </h2>
      {filteredOffers.map((offer) => (
        <div key={offer.id}>
          {filteredApplications
            .filter((application) => application.offerId === offer.id)
            .map((application) => (
              <CandidateCard
                key={application.id}
                application={application}
                user={application.user}
              />
            ))}
        </div>
      ))}
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
  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      applications: JSON.parse(JSON.stringify(applications)),
      offers: JSON.parse(JSON.stringify(offers)),
    },
  };
}
