import React from 'react';

function JobDetails({ offer }) {
  return (
    <div
      className="  w-[40vw] h-screen  border-gray-200 border-2 shadow-lg m-4 border-solid rounded-lg mt-3 p-2"
      key={offer?.id}
    >
      <h3>Post: {offer?.title}</h3>
      <h3>Location: {offer?.location}</h3>
      <h3>Contract: {offer?.contractType}</h3>
      <h3>Description:</h3>
      <h3>{offer?.description}</h3>
    </div>
  );
}

export default JobDetails;
