import React from 'react';
import { useRouter } from 'next/router';

function JobDetailsPage({
  title,
  location,
  contractType,
  description,
  consultant,
  id,
}) {
  const router = useRouter();

  return (
    <div
      className="  w-[80vw] h-screen border-black border-2 m-4 border-solid rounded-lg mt-3 p-2 overflow-scroll"
      key={id}
    >
      <h3>Post: {title}</h3>
      <h3>Location: {location}</h3>
      <h3>Contract: {contractType}</h3>
      <h3>Description:</h3>
      <h3>{description}</h3>
      {consultant}
    </div>
  );
}

export default JobDetailsPage;
