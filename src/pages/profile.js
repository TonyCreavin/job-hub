import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';
import { getSession } from 'next-auth/react';

import ProfileForm from '../components/ProfileForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props) {
  const [userData, setUserData] = useState({});
  // const { data: session, status } = useSession();

  useEffect(() => {
    const session = props.data;
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log('Error fetching user data', err));
    }
  }, [props.data]);

  return (
    <ProfileForm userData={userData} key={userData?.id} session={props.data} />
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

  return {
    props: { session, data: session },
  };
}
