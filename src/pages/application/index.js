import React, { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/react';
import CandidateCard from '../../components/CandidateCard';
import LanguageContext from '../../LanguageContext';
import prisma from '../../../lib/prisma';

export default function ConsultantsApplications({
  applications,
  offers,
  data,
}) {
  const { language } = useContext(LanguageContext);
  // const { data: session, status } = useSession();
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = data;
    if (offers && Array.isArray(offers)) {
      const filteredOffers = offers.filter(
        (offer) => offer.userId === session?.user.id
      );
      setFilteredOffers(filteredOffers);
    }
  }, [data, offers]);

  const filteredApplications = applications.filter((application) =>
    filteredOffers.some((offer) => offer.id === application.offerId)
  );

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

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
      session,
      data: session,
      applications: JSON.parse(JSON.stringify(applications)),
      offers: JSON.parse(JSON.stringify(offers)),
    },
  };
}
