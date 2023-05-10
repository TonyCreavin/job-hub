import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ProfileForm from '../components/ProfileForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ cvs }) {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();

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
    <ProfileForm userData={userData} key={userData?.id} session={session} />
  );
}
