import React, { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { LanguageProvider } from '../LanguageContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null;
  }, [router.events]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />

      <SessionProvider session={session}>
        <LanguageProvider>
          <SideBar />
          <Component {...pageProps} />
          <Footer />
        </LanguageProvider>
      </SessionProvider>
    </>
  );
}
