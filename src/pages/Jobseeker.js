import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

// import JobDetails from '@/components/JobDetails';
// import JobPost from '@/components/JobPosts';
// import prisma from '../../lib/prisma';

const inter = Inter({ subsets: ["latin"] });

const Registration = () => {
  return (
    <div className="container">
      <br />
      <br /> <br />
      <div className="jobseeker">
        <h1 className="mx-auto my-2">Registration</h1>
        <br /> <b></b>
        <form className="w-50 mx-auto" action="">
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="firstname"
              />{" "}
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="lastname"
              />{" "}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="tel"
                className="form form-control"
                placeholder="phone"
              />{" "}
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="github"
              />{" "}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="linkedin"
              />
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="skills"
              />{" "}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="address"
              />{" "}
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                className="form form-control"
                placeholder="city"
              />{" "}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                placeholder="postcode"
                className="form form-control"
              />{" "}
            </div>
            <div className="col-md-6 mb-2 col-sm-12">
              <input
                type="text"
                placeholder="country"
                className="form form-control"
              />{" "}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Envoyer
          </button>
        </form>
        <div className="w-full h-screen mt-3"></div>
      </div>
    </div>
  );
};

export default Registration;
