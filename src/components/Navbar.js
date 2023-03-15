import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

function Navbar() {
  const { data: session, status } = useSession();
  console.log('session => ', session);
  console.log('status => ', status);
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
        <button className="bg-slate-300 p-3 mr-3 rounded-lg">Register</button>
      </div>
    </div>
  );
}

export default Navbar;
