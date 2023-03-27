import React from 'react';
import Link from 'next/link';

export default function ApplicantsCard(props) {
  return (
    <Link href="#">
      <div
        className=" border-solid overflow-scroll  border-gray-200 border-2 shadow-lg w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
        key={props.id}
      >
        <h3>userId: {props.userId}</h3>
        <h3>offerId: {props.offerId}</h3>
        <h3>CV: {props.cv}</h3>
        <h3>Description: {props.coverLetter}</h3>
      </div>
    </Link>
  );
}
