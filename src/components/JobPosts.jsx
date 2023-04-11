import React from 'react';
import Link from 'next/link';

function JobPost({ offer }) {
  return (
    <Link href={`/offer/${offer.id}`} className="no-underline text-black">
      <div
        className=" border-solid overflow-scroll border-gray-200 border-2  w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
        key={offer.id}
      >
        <h3>Post: {offer.title}</h3>
        <h3>Location: {offer.location}</h3>
        <h3>Contract: {offer.contractType}</h3>
        <h3>Description:</h3>
        <h3>{offer.description}</h3>
        <h3>{offer.id}</h3>
      </div>
    </Link>
  );
}

export default JobPost;
