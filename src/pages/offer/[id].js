import React, { useEffect, useState } from 'react';
import UploadCv from '../../components/UploadCv';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import EditOffer from '../../components/EditOffer';
import { useRouter } from 'next/router';
import JobDetailsPage from '../../components/JobDetailsPage';
import UploadCoverLetter from '../../components/UploadCoverLetter';
import fs from 'fs/promises';
import path from 'path';
import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';

import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default function Offer({ offer, user, application, cvs, session }) {
  const { language } = useContext(LanguageContext);
  const [userData, setUserData] = useState({});
  const [showEditOfferWindow, setShowEditOfferWindow] = useState(false);
  const [showApplicationWindow, setShowApplicationWindow] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [getOne, setGetOne] = useState([]);
  const [matched, setMatched] = useState({});

  const router = useRouter();

  async function handleDelete() {
    await axios.post('/api/offers/deleteOffer', { id: offer.id });
    router.push('/');
  }

  useEffect(() => {
    async function handleGetOne() {
      const res = await axios.get('/api/application');
      const data = res.data.filter(
        (application) => application.offerId === offer?.id
      );

      setGetOne(data);
    }
    handleGetOne();
  }, [offer?.id]);

  async function handleApplication(e) {
    e.preventDefault();

    await axios.post('/api/application/create', {
      userId: session.user.id,
      offerId: offer.id,
      coverLetter: coverLetter,
      applied: true,
    });
    router.push('/');
  }

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

  useEffect(() => {
    const matchedData = getOne.find(
      (application) => application.userId === userData.id
    );
    setMatched(matchedData);
  }, [getOne, userData?.id]);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-scroll ">
        {!showApplicationWindow && !showEditOfferWindow ? (
          <JobDetailsPage
            title={offer?.title}
            key={offer?.id}
            location={offer?.location}
            contractType={offer?.contractType}
            salary={offer?.salary}
            description={offer?.description}
            company={offer?.company}
            companyDescription={offer?.companyDescription}
            website={offer?.website}
            favorite={offer?.favorite}
            id={offer?.id}
            userId={offer?.userId}
            createdAt={offer?.createdAt}
            updatedAt={offer?.updatedAt}
          />
        ) : (
          ''
        )}
        {userData?.role === 'CONSULTANT' &&
          session.user.id === offer?.userId && (
            <div className="  mx-auto my-4">
              <button
                className="bg-red-500 ml-4 text-white rounded-md py-1 px-2 mb-2"
                onClick={handleDelete}
              >
                {!language ? ' Supprimer' : 'Delete'}
              </button>
              <button
                onClick={() => setShowEditOfferWindow((state) => !state)}
                className="bg-blue-500 ml-4 text-white rounded-md py-1 px-2 mb-2"
              >
                {!language ? 'Modifier' : 'Edit'}
              </button>
            </div>
          )}
        {session &&
          userData?.role === 'APPLICANT' &&
          matched?.userId === userData.id &&
          matched?.applied && (
            <button
              disabled
              className="bg-blue-300 w-40 mx-auto mt-4 text-white rounded-md py-1 px-2 mb-2"
            >
              {!language && 'Postulé'}
              {language && 'Applied'}
            </button>
          )}
        {session &&
          userData?.role === 'APPLICANT' &&
          matched?.userId !== userData.id && (
            <button
              onClick={() => setShowApplicationWindow((state) => !state)}
              className="bg-blue-500 w-40 mx-auto mt-4 text-white rounded-md py-1 px-2 mb-2"
            >
              {!language && 'Postuler'}
              {language && 'Apply'}
            </button>
          )}

        {showApplicationWindow && (
          <>
            <div className="flex flex-col mx-auto">
              <h3 className="flex justify-center font-semibold font-serif">
                {offer?.title}
              </h3>
              <h4 className="flex justify-center text-blue-400 font-normal font-serif">
                {offer?.company}
              </h4>
            </div>
            <UploadCv
              cvs={cvs}
              setShowApplicationWindow={setShowApplicationWindow}
            />
            <UploadCoverLetter
              handleApplication={handleApplication}
              setCoverLetter={setCoverLetter}
              coverLetter={coverLetter}
              closeWindow={() => setShowApplicationWindow(false)}
              offer={offer}
              document={document}
              user={user}
              application={application}
            />

            <button
              type="submit"
              className="bg-blue-500 rounded-md text-white w-32 h-7   mx-auto my-6"
              onClick={handleApplication}
            >
              {!language ? 'Postuler' : 'Apply'}
            </button>
          </>
        )}

        {showEditOfferWindow ? (
          <EditOffer
            offer={offer}
            closeWindow={() => setShowEditOfferWindow(false)}
            setShowEditOfferWindow={setShowEditOfferWindow}
          />
        ) : null}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const session = await getSession(context);
  const props = { cvs: [] };

  const cvs = await fs.readdir(path.join(process.env.CV_DIR));
  props.cvs = cvs;

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/',
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
      session: session,
      cvs: props.cvs,
    },
  };
}
