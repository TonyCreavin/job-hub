import React from 'react';
import Link from 'next/link';

function JobPost({ id, title, location, description, contractType }) {
  return (
    <Link href={`offer/${id}`}>
      <div
        className=" border-solid overflow-scroll  border-gray-200 border-2 shadow-lg w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
        key={id}
      >
        <h3>Post: {title}</h3>
        <h3>Location: {location}</h3>
        <h3>Contract: {contractType}</h3>
        <h3>Description:</h3>
        <h3>{description}</h3>
        <h3>{id}</h3>
      </div>
    </Link>
  );
}

export default JobPost;
