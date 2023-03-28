import React from 'react';

export default function ApplicationCard() {
  return (
    <div
      className=" border-solid overflow-scroll  border-gray-200 border-2 shadow-lg w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
      key={offer.id}
    >
      <h3>Post: {offer.title}</h3>
      <h3>Location: {offer.location}</h3>
      <h3>Contract: {offer.contractType}</h3>
      <h3>Description:</h3>
      <h3>{offer.description}</h3>
      <h3>{offer.id}</h3>
    </div>
  );
}
