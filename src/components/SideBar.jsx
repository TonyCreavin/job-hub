import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

const SideBar = () => {
  const { language, buttonHandler } = useContext(LanguageContext);

  const route = useRouter();
  const { data: session, status } = useSession();
  console.log('session => ', session);
  console.log('status => ', status);
  console.log('session.user.email => ', session?.user.email);
  const [userData, setUserData] = useState({});

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
    <>
      <header className=" navbar navbar-expand-lg bd-navbar sticky-top w-full h-20 pl-[15px] bg-[#2D3E64] flex justify-between align-center items-stretch">
        <nav
          className="container-xxl bd-gutter flex-wrap flex-lg-nowrap"
          aria-label="Main navigation"
        >
          <div className="bd-navbar-toggle"></div>

          <h1 className="navbar-brand p-0 me-0 me-lg-2 text-white font-semibold text-2xl">
            HDM
          </h1>

          <div className="d-flex">
            <button
              className="navbar-toggler d-flex d-lg-none order-3 p-2 bg-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdNavbar"
              aria-controls="bdNavbar"
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="bi"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="offcanvas-lg offcanvas-end flex-grow-1"
            tabIndex="-1"
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
            data-bs-scroll="true"
          >
            <div className="offcanvas-header px-4 pb-0 bg-[#2D3E64]">
              <h3
                className="offcanvas-title text-white font-semibold text-2xl"
                id="bdNavbarOffcanvasLabel"
              >
                HDM
              </h3>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                data-bs-target="#bdNavbar"
              ></button>
            </div>

            <div className="offcanvas-body p-4 pt-0 p-lg-0 bg-[#2D3E64]">
              <ul className="navbar-nav mx-auto bd-navbar-nav d-flex">
                <li className="nav-item col-6 col-lg-auto  mt-2 mr-20">
                  <Link href="/" className="text-white no-underline">
                    {!language ? 'Accueil' : 'Home'}
                  </Link>
                </li>

                {session && userData?.role === 'CONSULTANT' && (
                  <li className="nav-item col-6 col-lg-auto mt-2 mr-20">
                    <Link
                      href="/offers/consultantOffers"
                      className="text-white no-underline "
                    >
                      {!language ? 'Mes Offres' : 'My Offers'}
                    </Link>
                  </li>
                )}
                {session && userData?.role === 'APPLICANT' && (
                  <li className="nav-item col-6 col-lg-auto  mt-2 mr-20">
                    <Link
                      href="/offers/ApplicantOffers"
                      className="text-white no-underline"
                    >
                      {!language ? 'Mes Candidatures' : 'My Applications'}
                    </Link>
                  </li>
                )}
                {session && userData?.role === 'CONSULTANT' && (
                  <li className="nav-item col-6 col-lg-auto  mt-2 mr-20">
                    <Link
                      href="/application"
                      className="text-white no-underline"
                    >
                      {!language ? 'Candidatures' : 'Applications'}
                    </Link>
                  </li>
                )}
                {session && userData?.role === 'CONSULTANT' && (
                  <li className="nav-item col-6 col-lg-auto  mt-2 mr-20">
                    <Link
                      href="/offers/create_offer"
                      className="text-white no-underline"
                    >
                      {!language ? 'Créer une offre' : 'Create an offer'}
                    </Link>
                  </li>
                )}
                <li className="nav-item    col-6 col-lg-auto mt-2 mr-20">
                  <Link href="/profile" className="text-white no-underline">
                    {!language ? 'Mon Profil' : 'My Profile'}
                  </Link>
                </li>

                <li>
                  <button onClick={buttonHandler} className="btn btn-primary">
                    {!language ? 'EN' : 'FR'}
                  </button>
                </li>
              </ul>
              <div className="flex justify-end">
                {!session && status !== 'authenticated' && (
                  <Link
                    href="/api/auth/signin"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    <button className="bg-slate-300 p-3 mr-3 rounded-lg float-end">
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
                  <Link href="/">
                    <button
                      className="bg-slate-300 p-3 mr-3 rounded-lg"
                      onClick={handleSwitchToConsultant}
                    >
                      {!language ? 'Recruiteur' : 'Recruiter'}
                    </button>
                  </Link>
                )}

                {session && userData?.role === 'CONSULTANT' && (
                  <Link href="/">
                    <button
                      className="bg-slate-300 p-3 mr-3 rounded-lg"
                      onClick={handleSwitchToApplicant}
                    >
                      {!language ? 'Candidat' : 'Applicant'}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default SideBar;
