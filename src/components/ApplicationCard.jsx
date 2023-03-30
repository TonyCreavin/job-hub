import React from 'react';

export default function ApplicationCard({ application, user }) {
  return (
    <div
      className=" border-solid overflow-scroll  border-gray-200 border-2 shadow-lg w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
      key={application.id}
    >
      <h3>userId: {application.userId}</h3>
      <h3>offerId: {application.offerId}</h3>
      <h3>cv: {application.cv}</h3>

      <h3>coverLetter: {application.coverLetter}</h3>
      <h3>application id: {application.id}</h3>
      <h3>name : {user.name}</h3>
    </div>
  );
}
