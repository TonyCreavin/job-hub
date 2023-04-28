import React from 'react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

export default function Footer() {
  const { language } = useContext(LanguageContext);
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
    </div>
  );
}
