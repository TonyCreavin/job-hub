import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Navbar() {
  const route = useRouter();
  const { data: session, status } = useSession();
  console.log('session => ', session);
  console.log('status => ', status);
  console.log('session.user.email => ', session?.user.email);
  const [userData, setUserData] = React.useState({});

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
  console.log('userData => ', userData);
  const handleSwitchToApplicant = () => {
    axios
      .put(
        `/api/user/editUser`,
        {
          id: session.user.id,
          role: userData.role === 'CONSULTANT' && 'APPLICANT',
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log('res.data => ', res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSwitchToConsultant = () => {
    axios

      .put(`/api/user/editUser`, {
        id: session.user.id,
        role: userData.role === 'APPLICANT' && 'CONSULTANT',
      })
      .then((res) => {
        console.log('res.data => ', res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-20 pl-[15px] bg-[#2D3E64] flex justify-between align-center items-center">
      <h1 className="text-white font-semibold text-2xl">HDM</h1>

      <div className="flex justify-end">
        {!session && status !== 'authenticated' && (
          <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <button className="bg-slate-300 p-3 mr-3 rounded-lg">
              Sign In
            </button>
          </Link>
        )}
        {session && (
          <Link
            href="/api/auth/signout"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <button className="bg-slate-300 p-3 mr-3 rounded-lg">
              Sign Out
            </button>
          </Link>
        )}

        {session && userData?.role === 'APPLICANT' && (
          <Link href="/offers/create_offer">
            <button
              className="bg-slate-300 p-3 mr-3 rounded-lg"
              onClick={handleSwitchToConsultant}
            >
              Recruiter
            </button>
          </Link>
        )}

        {session && userData?.role === 'CONSULTANT' && (
          <Link href="/offers">
            <button
              className="bg-slate-300 p-3 mr-3 rounded-lg"
              onClick={handleSwitchToApplicant}
            >
              Jobseeker
            </button>
          </Link>
        )}
        {session && userData?.role === 'CONSULTANT' && (
          <Link href="/create_offer">
            <button className="bg-slate-300 p-3 mr-3 rounded-lg">
              create offer
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
