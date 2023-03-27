import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';

// import JobDetails from '@/components/JobDetails';
// import JobPost from '@/components/JobPosts';
// import prisma from '../../lib/prisma';

const inter = Inter({ subsets: ['latin'] });

const Registration = () => {
  return (
    <div className="container">
      <br />
      <br /> <br />
      <div className="jobseeker">
        <div
          style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <h1>Chercheur</h1>
          <br /> <b></b>
          <form
            className="row d-flex justify-content-around"
            style={{}}
            action=""
          >
            <div className="col-6">
              <input
                type="text"
                className="form form-control"
                placeholder="name"
              />{' '}
              <br />
              <input
                type="tel"
                className="form form-control"
                placeholder="phone"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="linkedin"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="github"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="image"
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form form-control"
                placeholder="skills"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="address"
              />{' '}
              <br />
              <input
                type="text"
                className="form form-control"
                placeholder="city"
              />{' '}
              <br />
              <input
                type="text"
                placeholder="postcode"
                className="form form-control"
              />{' '}
              <br />
              <input
                type="text"
                placeholder="country"
                className="form form-control"
              />{' '}
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ width: '100%' }}
              >
                envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
