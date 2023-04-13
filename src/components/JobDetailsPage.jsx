import React from 'react';
import { useRouter } from 'next/router';

function JobDetailsPage({
  title,
  location,
  contractType,
  description,
  company,
  website,
  companyDescription,
  id,
}) {
  const router = useRouter();

  return (
    <div
      className="  w-[80vw] h-screen   border-gray-200 border-2  mx-auto border-solid rounded-lg mt-3 p-2 overflow-scroll"
      key={id}
    >
      <div className="flex flex-col md:flex-row justify-between">
        <h3>Post: {title}</h3>
        <h3>Location: {location}</h3>
        <h3>Contract: {contractType}</h3>
      </div>
      <div className="flex flex-row justify-between">
        <h3>company :{company}</h3>
        <h3>website :{website}</h3>
      </div>
      <h3>company description :</h3>
      <h3>{companyDescription}</h3>
      <h3>Description:</h3>
      <h3>{description}</h3>
    </div>
  );
}

export default JobDetailsPage;
