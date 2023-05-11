import React from 'react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function Footer() {
  const { data: session } = useSession();
  const { language } = useContext(LanguageContext);

  const handleDelete = async () => {
    const response = await axios.post('/api/user/deleteUser/', {
      id: session.user.id,
    });
  };

  return (
    <div
      className="flex justify-between"
      style={{
        backgroundColor: '#2D3E64',
        color: 'white',
        height: '100px',
        padding: '30px',
        textAlign: 'center',

        width: '100%',
      }}
    >
      {!language ? (
        <a
          className="no-underline hover:underline text-white text-2xl font-bold"
          href="https://www.hdmnetwork.com/fr"
        >
          HDM
        </a>
      ) : (
        <a
          className="no-underline hover:underline text-white text-2xl font-bold"
          href="https://www.hdmnetwork.com/en"
        >
          HDM
        </a>
      )}

      <p>© 2020-2023 HDM NETWORK ASBL.</p>
      {!language ? (
        <a
          className="no-underline hover:underline text-white"
          href="https://www.hdmnetwork.com/fr/politique-de-confidentialite"
        >
          Politique de Confidentialité
        </a>
      ) : (
        <a
          className="no-underline hover:underline text-white"
          href=" https://www.hdmnetwork.com/en/privacy-policy"
        >
          Privacy Policy
        </a>
      )}

      {session && (
        <Link
          href="/api/auth/signout"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
            signOut();
          }}
        >
          <button className="underline text-white rounded-lg text-sm p-2 py-1">
            {!language ? 'Supprimer le compte' : 'Delete account'}
          </button>
        </Link>
      )}
    </div>
  );
}
