import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";

const SideBar = () => {
  const route = useRouter();
  const { data: session, status } = useSession();
  console.log("session => ", session);
  console.log("status => ", status);
  console.log("session.user.email => ", session?.user.email);
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/user/${session?.user.id}`)
        .then((res) => {
          console.log("res.data => ", res.data);
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [session?.user.id]);
  console.log("userData => ", userData);
  const handleSwitchToApplicant = () => {
    axios
      .put(
        `/api/user/editUser`,
        {
          id: session.user.id,
          role: userData.role === "CONSULTANT" && "APPLICANT",
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data => ", res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSwitchToConsultant = () => {
    axios

      .put(`/api/user/editUser`, {
        id: session.user.id,
        role: userData.role === "APPLICANT" && "CONSULTANT",
      })
      .then((res) => {
        console.log("res.data => ", res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <header class="mt-3 navbar navbar-expand-lg bd-navbar sticky-top w-full h-20 pl-[15px] bg-[#2D3E64] flex justify-between align-center items-center">
        <nav
          class="container-xxl bd-gutter flex-wrap flex-lg-nowrap"
          aria-label="Main navigation"
        >
          <div class="bd-navbar-toggle"></div>

          <h1 class="navbar-brand p-0 me-0 me-lg-2 text-white font-semibold text-2xl">
            HDM
          </h1>

          <div class="d-flex">
            <button
              class="navbar-toggler d-flex d-lg-none order-3 p-2 bg-white"
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
                class="bi"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </button>
          </div>

          <div
            class="offcanvas-lg offcanvas-end flex-grow-1"
            tabindex="-1"
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
            data-bs-scroll="true"
          >
            <div class="offcanvas-header px-4 pb-0 bg-[#2D3E64]">
              <h5
                class="offcanvas-title text-white font-semibold text-2xl"
                id="bdNavbarOffcanvasLabel"
              >
                HDM
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                data-bs-target="#bdNavbar"
              ></button>
            </div>

            <div class="offcanvas-body p-4 pt-0 p-lg-0 bg-[#2D3E64]">
              <ul class="navbar-nav mx-auto bd-navbar-nav d-flex">
                <li class="nav-item col-6 col-lg-auto">
                  <Link
                    href="/offers"
                    className="text-white nav-link py-2 px-0 px-lg-2 text-decoration-underline"
                  >
                    Home
                  </Link>
                </li>

                {session && userData?.role === "CONSULTANT" && (
                  <li class="nav-item col-6 col-lg-auto">
                    <Link
                      href="/offers/consultantOffers"
                      className="text-white"
                    >
                      My Offers
                    </Link>
                  </li>
                )}
                {session && userData?.role === "CONSULTANT" && (
                  <li class="nav-item col-6 col-lg-auto">
                    <Link href="/offers/create_offer" className="text-white">
                      create offer
                    </Link>
                  </li>
                )}
              </ul>
              <div className="flex justify-end">
                {!session && status !== "authenticated" && (
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

                {session && userData?.role === "APPLICANT" && (
                  <Link href="/offers">
                    <button
                      className="bg-slate-300 p-3 mr-3 rounded-lg"
                      onClick={handleSwitchToConsultant}
                    >
                      Recruiter
                    </button>
                  </Link>
                )}

                {session && userData?.role === "CONSULTANT" && (
                  <Link href="/offers">
                    <button
                      className="bg-slate-300 p-3 mr-3 rounded-lg"
                      onClick={handleSwitchToApplicant}
                    >
                      Jobseeker
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
